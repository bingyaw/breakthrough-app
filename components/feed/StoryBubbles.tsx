import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useAppStore, Category } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

const COLORS = ["#FFE4E1", "#E1F0FF", "#E8F5E9", "#FFF8E1", "#F3E5F5", "#E0F7FA"];

interface TrendingTopic {
  id: string;
  labelKey: string;
  emoji: string;
  category: Category | null;
}

const TOPICS: TrendingTopic[] = [
  { id: "1", labelKey: "bubbleAI", emoji: "\u{1F916}", category: "For You" },
  { id: "2", labelKey: "space", emoji: "\u{1F680}", category: "Space" },
  { id: "3", labelKey: "science", emoji: "\u{1F9EC}", category: "Science" },
  { id: "4", labelKey: "bubbleStartups", emoji: "\u{1F4A1}", category: "For You" },
  { id: "5", labelKey: "bubbleCrypto", emoji: "\u{20BF}", category: null },
  { id: "6", labelKey: "bubbleClimate", emoji: "\u{1F30D}", category: null },
];

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
      {TOPICS.map((topic, index) => {
        const label = (strings as any)[topic.labelKey] ?? topic.labelKey;
        const bgColor = COLORS[index % COLORS.length];

        return (
          <Pressable
            key={topic.id}
            style={{ alignItems: "center", width: 68 }}
            onPress={() => {
              if (topic.category) {
                setActiveCategory(topic.category);
              }
            }}
          >
            <View
              style={[
                styles.bubble,
                {
                  backgroundColor: bgColor,
                  shadowColor: darkMode ? "#000" : "#999",
                },
              ]}
            >
              <Text style={styles.emoji}>{topic.emoji}</Text>
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                { color: darkMode ? "#CCC" : "#555" },
              ]}
            >
              {label}
            </Text>
          </Pressable>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontFamily: "DMSans_500Medium",
  },
});
