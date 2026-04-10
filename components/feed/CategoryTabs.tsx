import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useAppStore, Category } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

const categories: Category[] = ["For You", "Founders", "Tech", "Science", "Space"];

const categoryTranslationKeys: Record<Category, keyof ReturnType<typeof t>> = {
  "For You": "forYou",
  Founders: "founders",
  Tech: "tech",
  Science: "science",
  Space: "space",
};

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory, darkMode, language } = useAppStore();
  const i18n = t(language);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8, paddingBottom: 12 }}
    >
      {categories.map((cat) => {
        const isActive = cat === activeCategory;
        return (
          <Pressable
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive
                  ? "#E63329"
                  : darkMode
                  ? "#333"
                  : "#FFF",
                borderColor: isActive
                  ? "#E63329"
                  : darkMode
                  ? "#444"
                  : "#FFF",
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: isActive ? "#FFF" : darkMode ? "#CCC" : "#666",
                },
              ]}
            >
              {i18n[categoryTranslationKeys[cat]]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  tabText: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
  },
});
