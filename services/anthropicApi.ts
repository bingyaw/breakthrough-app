import { Article } from "@/data/articles";

const API_URL = "https://api.anthropic.com/v1/messages";

function getApiKey(): string {
  const key = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!key || key === "YOUR_ANTHROPIC_API_KEY_HERE") {
    throw new Error("Missing EXPO_PUBLIC_ANTHROPIC_API_KEY in .env");
  }
  return key;
}

const SYSTEM_PROMPT = `You are a content generator for "Spark", an inspiring news app about innovation. Generate exactly 6 unique, compelling articles. Each article must feel authentic — like real journalism about real breakthroughs.

Respond ONLY with a valid JSON array, no other text before or after. No markdown, no code fences, no explanation. Each object must have:
- "title": catchy headline (8-14 words)
- "subtitle": compelling subheading (10-18 words)
- "snippet": exactly 2 engaging sentences summarizing the article
- "body": exactly 3 paragraphs separated by \\n\\n. Each paragraph should be 3-4 sentences.
- "category": the exact category requested
- "author": realistic full name
- "authorAvatar": leave as empty string
- "readTime": estimated read time like "5 min"
- "tags": array of 3-4 relevant tags
- "pullQuote": one memorable quote from the article
- "isHot": boolean, true for 1-2 articles
- "isTrending": boolean, true for 1-2 different articles
- "badge": short label like "AI", "Space", "Biotech", "Startup", etc.`;

export interface UserInterests {
  founders: boolean;
  tech: boolean;
  science: boolean;
  space: boolean;
  ai: boolean;
  startups: boolean;
}

function buildUserPrompt(category: string, interests?: UserInterests): string {
  if (category === "For You") {
    const activeTopics = interests
      ? Object.entries(interests)
          .filter(([, enabled]) => enabled)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
      : [];

    if (activeTopics.length > 0) {
      return `Generate 6 inspiring articles personalized to the user's interests: ${activeTopics.join(", ")}. Distribute articles across these topics, weighting toward topics the user cares about most. Make each article feel fresh and current, covering the latest innovations and discoveries in these areas.`;
    }
    return `Generate 6 inspiring articles spanning Tech, Science, Space, AI, and Founders categories. Mix the categories evenly. Make each article feel fresh and current, covering the latest innovations and discoveries.`;
  }
  return `Generate 6 inspiring articles in the "${category}" category. Each should cover a different topic within ${category}. Make them feel fresh, current, and inspiring — covering the latest innovations, discoveries, and stories.`;
}

function cleanJsonString(raw: string): string {
  // Remove BOM characters
  let cleaned = raw.replace(/\uFEFF/g, "");
  // Replace smart/curly quotes with regular quotes
  cleaned = cleaned.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"');
  cleaned = cleaned.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");
  return cleaned;
}

function parseArticles(content: string): any[] {
  // Log raw content for debugging
  console.error("[parseArticles] Raw content (first 500 chars):", content.slice(0, 500));

  // Clean the content first
  const cleaned = cleanJsonString(content);

  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch {
    // Fall through to extraction
  }

  // Extract JSON array by finding the first [ and last ]
  const start = cleaned.indexOf("[");
  const end = cleaned.lastIndexOf("]");
  if (start !== -1 && end > start) {
    const jsonStr = cleaned.slice(start, end + 1);
    try {
      return JSON.parse(jsonStr);
    } catch {
      // Fall through to regex approach
    }
  }

  // Regex approach: find a JSON array pattern
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]);
    } catch {
      // Fall through to error
    }
  }

  console.error("[parseArticles] All parse attempts failed. Cleaned content:", cleaned.slice(0, 500));
  throw new Error("Failed to parse article JSON from API response");
}

export async function generateArticles(category: string, interests?: UserInterests): Promise<Article[]> {
  const apiKey = getApiKey();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserPrompt(category, interests),
        },
      ],
    }),
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;

  if (!content) {
    throw new Error("No content in Anthropic API response");
  }

  const rawArticles = parseArticles(content);

  if (!Array.isArray(rawArticles) || rawArticles.length === 0) {
    throw new Error("Invalid article array from API");
  }

  const articles: Article[] = [];
  for (let i = 0; i < rawArticles.length; i++) {
    try {
      const raw = rawArticles[i];
      if (!raw || typeof raw !== "object" || !raw.title) {
        console.warn(`Skipping malformed article at index ${i}`);
        continue;
      }
      articles.push({
        id: `gen-${category}-${Date.now()}-${i}`,
        title: raw.title,
        subtitle: raw.subtitle || raw.snippet || "",
        category: raw.category || category,
        imageUrl: "",
        author: raw.author || "Unknown Author",
        authorAvatar: raw.authorAvatar || "",
        likes: Math.floor(Math.random() * 3000) + 500,
        readTime: raw.readTime || "5 min",
        isHot: raw.isHot || false,
        isTrending: raw.isTrending || false,
        badge: raw.badge || category,
        pullQuote: raw.pullQuote || "",
        body: raw.body || raw.snippet || "",
        tags: raw.tags || [category],
        relatedIds: [],
      });
    } catch (err) {
      console.warn(`Skipping article at index ${i} due to error:`, err);
    }
  }

  if (articles.length === 0) {
    throw new Error("All articles failed to parse");
  }

  return articles;
}
