import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { getArticleById, articles, Article } from "@/data/articles";
import { useUnsplashImage } from "@/hooks/useUnsplashImage";
import ShimmerPlaceholder from "@/components/ShimmerPlaceholder";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function ArticleDetailSheet() {
  const {
    selectedArticleId,
    setSelectedArticle,
    darkMode,
    likedArticles,
    savedArticles,
    toggleLike,
    toggleSave,
    generatedArticles,
  } = useAppStore();

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const findArticle = (id: string): Article | undefined => {
    const staticArticle = getArticleById(id);
    if (staticArticle) return staticArticle;
    for (const catArticles of Object.values(generatedArticles)) {
      const found = catArticles.find((a) => a.id === id);
      if (found) return found;
    }
    return undefined;
  };

  const article = selectedArticleId ? findArticle(selectedArticleId) : null;
  const isLiked = selectedArticleId ? likedArticles.has(selectedArticleId) : false;
  const isSaved = selectedArticleId ? savedArticles.has(selectedArticleId) : false;

  useEffect(() => {
    if (article) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 200,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [article]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 10 && Math.abs(gestureState.dx) < Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150 || gestureState.vy > 0.5) {
          close();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const close = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setSelectedArticle(null));
  };

  const relatedArticles = article
    ? article.relatedIds.map((id) => articles.find((a) => a.id === id)).filter(Boolean)
    : [];

  const { imageUrl: unsplashUrl, loading: unsplashLoading, error: unsplashError } =
    useUnsplashImage(
      article?.category ?? "",
      article?.title ?? ""
    );

  const [heroLoadError, setHeroLoadError] = useState(false);

  // Reset error state when article changes
  useEffect(() => {
    setHeroLoadError(false);
  }, [selectedArticleId]);

  if (!article) return null;

  const bg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";

  const heroUrl = !unsplashError && unsplashUrl ? unsplashUrl : article.imageUrl;
  const showHeroShimmer = unsplashLoading;
  const showHeroFallback = unsplashError || heroLoadError;

  const categoryGradients: Record<string, [string, string]> = {
    Tech: ["#1a1a2e", "#16213e"],
    Founders: ["#2d1b69", "#11001c"],
    Space: ["#0f0c29", "#302b63"],
    Science: ["#134e5e", "#71b280"],
  };

  return (
    <Modal visible={!!article} transparent animationType="none" statusBarTranslucent>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={close} />
        <Animated.View
          style={[
            styles.sheet,
            { backgroundColor: bg, transform: [{ translateY }] },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Drag handle */}
          <View style={styles.handleBar}>
            <View
              style={[styles.handle, { backgroundColor: darkMode ? "#555" : "#DDD" }]}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingBottom: 60 }}
          >
            {/* Hero image */}
            {showHeroShimmer ? (
              <ShimmerPlaceholder
                width="100%"
                height={240}
                darkMode={darkMode}
              />
            ) : showHeroFallback ? (
              <LinearGradient
                colors={categoryGradients[article.category] || ["#2c3e50", "#3498db"]}
                style={[styles.heroImage, { justifyContent: "center", alignItems: "center" }]}
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
                  size={48}
                  color="rgba(255,255,255,0.3)"
                />
              </LinearGradient>
            ) : (
              <Image
                source={{ uri: heroUrl }}
                style={styles.heroImage}
                resizeMode="cover"
                onError={() => setHeroLoadError(true)}
              />
            )}

            <View style={styles.body}>
              {/* Category & read time */}
              <View style={styles.metaRow}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{article.category}</Text>
                </View>
                <Text style={[styles.readTime, { color: mutedText }]}>
                  {article.readTime} read
                </Text>
              </View>

              {/* Title */}
              <Text style={[styles.title, { color: textColor }]}>{article.title}</Text>

              {article.subtitle && (
                <Text style={[styles.subtitle, { color: mutedText }]}>
                  {article.subtitle}
                </Text>
              )}

              {/* Author */}
              <View style={styles.authorRow}>
                <Image source={{ uri: article.authorAvatar }} style={styles.authorAvatar} />
                <View>
                  <Text style={[styles.authorName, { color: textColor }]}>
                    {article.author}
                  </Text>
                  <Text style={[styles.authorMeta, { color: mutedText }]}>
                    {article.readTime} · {article.likes.toLocaleString()} likes
                  </Text>
                </View>
              </View>

              {/* Pull quote */}
              {article.pullQuote && (
                <View
                  style={[
                    styles.pullQuote,
                    { borderLeftColor: "#E63329", backgroundColor: darkMode ? "#222" : "#FFF5F5" },
                  ]}
                >
                  <Text style={[styles.pullQuoteText, { color: textColor }]}>
                    "{article.pullQuote}"
                  </Text>
                </View>
              )}

              {/* Body */}
              <Text style={[styles.bodyText, { color: darkMode ? "#DDD" : "#333" }]}>
                {article.body}
              </Text>

              {/* Action buttons */}
              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => toggleLike(article.id)}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: isLiked
                        ? "#FEE2E2"
                        : darkMode
                        ? "#333"
                        : "#F5F5F5",
                    },
                  ]}
                >
                  <Ionicons
                    name={isLiked ? "heart" : "heart-outline"}
                    size={20}
                    color={isLiked ? "#E63329" : mutedText}
                  />
                  <Text style={{ color: isLiked ? "#E63329" : mutedText, fontFamily: "DMSans_500Medium", fontSize: 13 }}>
                    {isLiked ? "Liked" : "Like"}
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => toggleSave(article.id)}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: isSaved
                        ? "#FEE2E2"
                        : darkMode
                        ? "#333"
                        : "#F5F5F5",
                    },
                  ]}
                >
                  <Ionicons
                    name={isSaved ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={isSaved ? "#E63329" : mutedText}
                  />
                  <Text style={{ color: isSaved ? "#E63329" : mutedText, fontFamily: "DMSans_500Medium", fontSize: 13 }}>
                    {isSaved ? "Saved" : "Save"}
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.actionButton,
                    { backgroundColor: darkMode ? "#333" : "#F5F5F5" },
                  ]}
                >
                  <Ionicons name="share-outline" size={20} color={mutedText} />
                  <Text style={{ color: mutedText, fontFamily: "DMSans_500Medium", fontSize: 13 }}>Share</Text>
                </Pressable>
              </View>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {article.tags.map((tag) => (
                  <View
                    key={tag}
                    style={[
                      styles.tag,
                      { backgroundColor: darkMode ? "#333" : "#F0F0F0" },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: darkMode ? "#CCC" : "#666" }]}>
                      #{tag}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <View style={{ marginTop: 24 }}>
                  <Text style={[styles.relatedTitle, { color: textColor }]}>
                    Related Articles
                  </Text>
                  {relatedArticles.map((related) =>
                    related ? (
                      <Pressable
                        key={related.id}
                        onPress={() => setSelectedArticle(related.id)}
                        style={[
                          styles.relatedCard,
                          { backgroundColor: darkMode ? "#2A2A2A" : "#F9F9F9" },
                        ]}
                      >
                        <Image
                          source={{ uri: related.imageUrl }}
                          style={styles.relatedImage}
                          resizeMode="cover"
                        />
                        <View style={{ flex: 1 }}>
                          <Text
                            numberOfLines={2}
                            style={[styles.relatedCardTitle, { color: textColor }]}
                          >
                            {related.title}
                          </Text>
                          <Text style={[styles.relatedMeta, { color: mutedText }]}>
                            {related.readTime} · {related.category}
                          </Text>
                        </View>
                      </Pressable>
                    ) : null
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    height: SCREEN_HEIGHT * 0.92,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  handleBar: {
    alignItems: "center",
    paddingVertical: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  heroImage: {
    width: "100%",
    height: 240,
  },
  body: {
    padding: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: "#E63329",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    color: "#FFF",
    fontSize: 11,
    fontFamily: "DMSans_700Bold",
    textTransform: "uppercase",
  },
  readTime: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
  },
  title: {
    fontSize: 22,
    fontFamily: "DMSans_700Bold",
    lineHeight: 28,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    lineHeight: 21,
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
  },
  authorMeta: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    marginTop: 2,
  },
  pullQuote: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    paddingVertical: 12,
    paddingRight: 16,
    marginBottom: 20,
    borderRadius: 4,
  },
  pullQuoteText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    fontStyle: "italic",
    lineHeight: 24,
  },
  bodyText: {
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    lineHeight: 24,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
  },
  relatedTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    marginBottom: 12,
  },
  relatedCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  relatedImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  relatedCardTitle: {
    fontSize: 13,
    fontFamily: "DMSans_700Bold",
    lineHeight: 18,
    marginBottom: 4,
  },
  relatedMeta: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
  },
});
