import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { Article } from "@/data/articles";
import { useUnsplashImage } from "@/hooks/useUnsplashImage";
import ShimmerPlaceholder from "@/components/ShimmerPlaceholder";

const CARD_GAP = 10;
const PADDING = 16;
const CARD_WIDTH = (Dimensions.get("window").width - PADDING * 2 - CARD_GAP) / 2;

// Vary image heights for masonry effect
const imageHeights: Record<number, number> = {
  0: 180,
  1: 140,
  2: 160,
  3: 200,
  4: 150,
  5: 170,
  6: 190,
  7: 145,
  8: 175,
  9: 155,
};

// Category-based gradient fallbacks
const categoryGradients: Record<string, [string, string]> = {
  Tech: ["#1a1a2e", "#16213e"],
  Founders: ["#2d1b69", "#11001c"],
  Space: ["#0f0c29", "#302b63"],
  Science: ["#134e5e", "#71b280"],
};

export default function FeedCard({ article, index }: { article: Article; index: number }) {
  const { darkMode, likedArticles, savedArticles, toggleLike, toggleSave, setSelectedArticle } =
    useAppStore();

  const isLiked = likedArticles.has(article.id);
  const isSaved = savedArticles.has(article.id);
  const imgHeight = imageHeights[index % 10] || 160;

  const { imageUrl: unsplashUrl, loading: unsplashLoading, error: unsplashError } =
    useUnsplashImage(article.category, article.title);

  const [imageLoadError, setImageLoadError] = useState(false);

  const showShimmer = unsplashLoading;
  const showFallbackGradient = unsplashError || imageLoadError;
  const displayUrl = !unsplashError && unsplashUrl ? unsplashUrl : article.imageUrl;

  return (
    <Pressable
      onPress={() => setSelectedArticle(article.id)}
      style={[
        styles.card,
        {
          width: CARD_WIDTH,
          backgroundColor: darkMode ? "#2A2A2A" : "#FFFFFF",
          shadowColor: darkMode ? "#000" : "#000",
        },
      ]}
    >
      {/* Image */}
      <View style={{ position: "relative" }}>
        {showShimmer ? (
          <ShimmerPlaceholder
            width={CARD_WIDTH}
            height={imgHeight}
            borderRadius={0}
            darkMode={darkMode}
          />
        ) : showFallbackGradient ? (
          <LinearGradient
            colors={categoryGradients[article.category] || ["#2c3e50", "#3498db"]}
            style={[styles.image, { height: imgHeight, justifyContent: "center", alignItems: "center" }]}
          >
            <Ionicons
              name={
                article.category === "Space"
                  ? "planet"
                  : article.category === "Science"
                  ? "flask"
                  : article.category === "Founders"
                  ? "person"
                  : "hardware-chip"
              }
              size={32}
              color="rgba(255,255,255,0.3)"
            />
          </LinearGradient>
        ) : (
          <Image
            source={{ uri: displayUrl }}
            style={[styles.image, { height: imgHeight }]}
            resizeMode="cover"
            onError={() => setImageLoadError(true)}
          />
        )}

        {/* Badge */}
        {article.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{article.badge}</Text>
          </View>
        )}

        {/* Hot / Trending label */}
        {(article.isHot || article.isTrending) && (
          <View
            style={[
              styles.label,
              { backgroundColor: article.isHot ? "#E63329" : "#FF8C00" },
            ]}
          >
            <Ionicons
              name={article.isHot ? "flame" : "trending-up"}
              size={10}
              color="#FFF"
            />
            <Text style={styles.labelText}>
              {article.isHot ? "HOT" : "TRENDING"}
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: darkMode ? "#F5F5F5" : "#1A1A1A" }]}
        >
          {article.title}
        </Text>

        {/* Author row */}
        <View style={styles.authorRow}>
          <Image source={{ uri: article.authorAvatar }} style={styles.avatar} />
          <Text
            numberOfLines={1}
            style={[styles.authorName, { color: darkMode ? "#AAA" : "#888" }]}
          >
            {article.author}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable onPress={() => toggleLike(article.id)} style={styles.actionBtn}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={16}
              color={isLiked ? "#E63329" : darkMode ? "#888" : "#999"}
            />
            <Text style={[styles.actionText, { color: darkMode ? "#888" : "#999" }]}>
              {isLiked ? article.likes + 1 : article.likes}
            </Text>
          </Pressable>

          <Pressable onPress={() => toggleSave(article.id)} style={styles.actionBtn}>
            <Ionicons
              name={isSaved ? "bookmark" : "bookmark-outline"}
              size={16}
              color={isSaved ? "#E63329" : darkMode ? "#888" : "#999"}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: CARD_GAP,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 10,
    fontFamily: "DMSans_700Bold",
    textTransform: "uppercase",
  },
  label: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  labelText: {
    color: "#FFF",
    fontSize: 9,
    fontFamily: "DMSans_700Bold",
    letterSpacing: 0.5,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontFamily: "DMSans_700Bold",
    lineHeight: 17,
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  avatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  authorName: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
  },
});
