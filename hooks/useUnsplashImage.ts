import { useState, useEffect } from "react";

const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;

// In-memory cache to avoid refetching during the session
const imageCache = new Map<string, string>();

export function useUnsplashImage(category: string, title: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchImage() {
      // Build a search query from category + first few title keywords
      const titleWords = title.split(/\s+/).slice(0, 3).join(" ");
      const query = `${category} ${titleWords}`;
      const cacheKey = query.toLowerCase();

      if (imageCache.has(cacheKey)) {
        setImageUrl(imageCache.get(cacheKey)!);
        setLoading(false);
        return;
      }

      if (!UNSPLASH_ACCESS_KEY) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
          }
        );

        if (!response.ok) throw new Error("Unsplash API error");

        const data = await response.json();

        if (!cancelled && data.results && data.results.length > 0) {
          const url = data.results[0].urls.regular;
          imageCache.set(cacheKey, url);
          setImageUrl(url);
        } else {
          setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchImage();
    return () => {
      cancelled = true;
    };
  }, [category, title]);

  return { imageUrl, loading, error };
}
