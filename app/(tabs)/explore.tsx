import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { articles } from "@/data/articles";
import ArticleDetailSheet from "@/components/article/ArticleDetailSheet";

const trendingTopics = [
  { label: "AI Revolution", emoji: "🤖", count: "2.4K posts" },
  { label: "Mars Mission", emoji: "🚀", count: "1.8K posts" },
  { label: "Gene Editing", emoji: "🧬", count: "1.2K posts" },
  { label: "Startup Funding", emoji: "💰", count: "956 posts" },
  { label: "Quantum Computing", emoji: "⚛️", count: "843 posts" },
  { label: "5G Networks", emoji: "📡", count: "721 posts" },
];

export default function ExploreScreen() {
  const { darkMode, setSelectedArticle } = useAppStore();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";
  const cardBg = darkMode ? "#2A2A2A" : "#FFFFFF";
  const inputBg = darkMode ? "#2A2A2A" : "#FFFFFF";

  const filteredArticles = search
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.category.toLowerCase().includes(search.toLowerCase())
      )
    : articles.slice(0, 5);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Text style={[styles.title, { color: textColor }]}>Discover</Text>
      </View>

      {/* Search bar */}
      <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
        <Ionicons name="search" size={18} color={mutedText} />
        <TextInput
          placeholder="Search stories, topics, founders..."
          placeholderTextColor={mutedText}
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, { color: textColor }]}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trending Topics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Trending Topics</Text>
          <View style={styles.topicsGrid}>
            {trendingTopics.map((topic) => (
              <Pressable
                key={topic.label}
                style={[styles.topicCard, { backgroundColor: cardBg }]}
              >
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                <Text style={[styles.topicLabel, { color: textColor }]}>{topic.label}</Text>
                <Text style={[styles.topicCount, { color: mutedText }]}>{topic.count}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Top Stories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {search ? "Search Results" : "Top Stories"}
          </Text>
          {filteredArticles.map((article) => (
            <Pressable
              key={article.id}
              onPress={() => setSelectedArticle(article.id)}
              style={[styles.storyCard, { backgroundColor: cardBg }]}
            >
              <Image
                source={{ uri: article.imageUrl }}
                style={styles.storyImage}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <View style={styles.storyBadge}>
                  <Text style={styles.storyBadgeText}>{article.category}</Text>
                </View>
                <Text
                  numberOfLines={2}
                  style={[styles.storyTitle, { color: textColor }]}
                >
                  {article.title}
                </Text>
                <Text style={[styles.storyMeta, { color: mutedText }]}>
                  {article.author} · {article.readTime}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <ArticleDetailSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    marginBottom: 12,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  topicCard: {
    width: "48%",
    padding: 14,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topicEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  topicLabel: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
  },
  topicCount: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    marginTop: 2,
  },
  storyCard: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  storyBadge: {
    backgroundColor: "#E63329",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  storyBadgeText: {
    color: "#FFF",
    fontSize: 9,
    fontFamily: "DMSans_700Bold",
    textTransform: "uppercase",
  },
  storyTitle: {
    fontSize: 13,
    fontFamily: "DMSans_700Bold",
    lineHeight: 18,
  },
  storyMeta: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    marginTop: 4,
  },
});
