import React from "react";
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";
import { articles } from "@/data/articles";
import ArticleDetailSheet from "@/components/article/ArticleDetailSheet";

export default function SavedScreen() {
  const { darkMode, savedArticles, setSelectedArticle, generatedArticles, language } = useAppStore();
  const i18n = t(language);
  const insets = useSafeAreaInsets();

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";
  const cardBg = darkMode ? "#2A2A2A" : "#FFFFFF";

  const allArticles = [
    ...articles,
    ...Object.values(generatedArticles).flat(),
  ];
  const savedList = allArticles.filter((a) => savedArticles.has(a.id));

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={[styles.title, { color: textColor }]}>{i18n.savedTitle}</Text>
        <Text style={[styles.count, { color: mutedText }]}>
          {savedList.length} {savedList.length !== 1 ? i18n.articles : i18n.article}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {savedList.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={64} color={darkMode ? "#444" : "#DDD"} />
            <Text style={[styles.emptyTitle, { color: textColor }]}>{i18n.noSavedArticles}</Text>
            <Text style={[styles.emptySubtitle, { color: mutedText }]}>
              {i18n.tapBookmarkHint}
            </Text>
          </View>
        ) : (
          savedList.map((article) => (
            <Pressable
              key={article.id}
              onPress={() => setSelectedArticle(article.id)}
              style={[styles.card, { backgroundColor: cardBg }]}
            >
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{article.category}</Text>
                </View>
                <Text numberOfLines={2} style={[styles.cardTitle, { color: textColor }]}>
                  {article.title}
                </Text>
                <Text style={[styles.cardMeta, { color: mutedText }]}>
                  {article.author} · {article.readTime}
                </Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>

      <ArticleDetailSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  count: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    marginTop: 2,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  badge: {
    backgroundColor: "#E63329",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgeText: {
    color: "#FFF",
    fontSize: 9,
    fontFamily: "DMSans_700Bold",
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    lineHeight: 19,
  },
  cardMeta: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    marginTop: 6,
  },
});
