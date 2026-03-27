import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useAppStore } from "@/store/useAppStore";
import { getArticlesByCategory, Article } from "@/data/articles";
import { generateArticles } from "@/services/anthropicApi";
import FeedCard from "./FeedCard";
import SkeletonFeed from "./SkeletonFeed";

const CARD_GAP = 10;
const PADDING = 16;

export default function MasonryFeed() {
  const activeCategory = useAppStore((s) => s.activeCategory);
  const generatedArticles = useAppStore((s) => s.generatedArticles);
  const feedLoading = useAppStore((s) => s.feedLoading);
  const setGeneratedArticles = useAppStore((s) => s.setGeneratedArticles);
  const setFeedLoading = useAppStore((s) => s.setFeedLoading);
  const setFeedError = useAppStore((s) => s.setFeedError);

  const fetchArticles = useCallback(async () => {
    if (generatedArticles[activeCategory]) return;

    setFeedLoading(true);
    setFeedError(null);
    try {
      const articles = await generateArticles(activeCategory);
      setGeneratedArticles(activeCategory, articles);
    } catch (err: any) {
      console.warn("Failed to generate articles, falling back to static:", err.message);
      setFeedError(err.message);
    } finally {
      setFeedLoading(false);
    }
  }, [activeCategory, generatedArticles]);

  useEffect(() => {
    fetchArticles();
  }, [activeCategory]);

  if (feedLoading && !generatedArticles[activeCategory]) {
    return <SkeletonFeed />;
  }

  const articles = generatedArticles[activeCategory] || getArticlesByCategory(activeCategory);

  const leftColumn: { article: Article; index: number }[] = [];
  const rightColumn: { article: Article; index: number }[] = [];

  articles.forEach((article, index) => {
    if (index % 2 === 0) {
      leftColumn.push({ article, index });
    } else {
      rightColumn.push({ article, index });
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {leftColumn.map(({ article, index }) => (
          <FeedCard key={article.id} article={article} index={index} />
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map(({ article, index }) => (
          <FeedCard key={article.id} article={article} index={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: PADDING,
    gap: CARD_GAP,
  },
  column: {
    flex: 1,
  },
});
