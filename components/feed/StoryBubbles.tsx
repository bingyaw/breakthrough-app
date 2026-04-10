import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAppStore, Category } from "@/store/useAppStore";
import { useUnsplashImage } from "@/hooks/useUnsplashImage";
import { t } from "@/lib/i18n";

interface TrendingTopic {
  id: string;
  labelKey: string;
  query: string;
  category: Category | null;
}

const TOPICS: TrendingTopic[] = [
  { id: "1", labelKey: "bubbleAI", query: "artificial intelligence", category: "For You" },
  { id: "2", labelKey: "space", query: "space exploration", category: "Space" },
  { id: "3", labelKey: "science", query: "science laboratory", category: "Science" },
  { id: "4", labelKey: "bubbleStartups", query: "startup technology", category: "For You" },
  { id: "5", labelKey: "bubbleCrypto", query: "cryptocurrency bitcoin", category: null },
  { id: "6", labelKey: "bubbleClimate", query: "climate change nature", category: null },
];

function TopicBubble({
  topic,
  darkMode,
  label,
  onPress,
}: {
  topic: TrendingTopic;
  darkMode: boolean;
  label: string;
  onPress: () => void;
}) {
  const { imageUrl, loading } = useUnsplashImage(topic.query, "");

  return (
    <Pressable style={{ alignItems: "center", width: 68 }} onPress={onPress}>
      <View
        style={[
          styles.bubble,
          { shadowColor: darkMode ? "#000" : "#999" },
        ]}
      >
        {loading || !imageUrl ? (
          <ActivityIndicator size="small" color="#999" />
        ) : (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
      </View>
      <Text
        numberOfLines={1}
        style={[styles.label, { color: darkMode ? "#CCC" : "#555" }]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function StoryBubbles() {
  const darkMode = useAppStore((s) => s.darkMode);
  const language = useAppStore((s) => s.language);
  const setActiveCategory = useAppStore((s) => s.setActiveCategory);
  const strings = t(language);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      style={{ marginBottom: 12 }}
    >
      {TOPICS.map((topic) => {
        const label = (strings as any)[topic.labelKey] ?? topic.labelKey;
        return (
          <TopicBubble
            key={topic.id}
            topic={topic}
            darkMode={darkMode}
            label={label}
            onPress={() => {
              if (topic.category) {
                setActiveCategory(topic.category);
              }
            }}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bubble: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#E5E5E5",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "DMSans_500Medium",
  },
});
