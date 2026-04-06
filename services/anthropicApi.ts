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

Respond ONLY with a valid JSON array. No markdown, no code fences, no explanation. Each object must have:
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

export async function generateArticles(category: string, interests?: UserInterests): Promise<Article[]> {
  const apiKey = getApiKey();

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
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;

  if (!content) {
    throw new Error("No content in Anthropic API response");
  }

  const rawArticles = JSON.parse(content);

  if (!Array.isArray(rawArticles) || rawArticles.length === 0) {
    throw new Error("Invalid article array from API");
  }

  return rawArticles.map((raw: any, i: number) => ({
    id: `gen-${category}-${Date.now()}-${i}`,
    title: raw.title || "Untitled",
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
  }));
}
