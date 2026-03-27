import React from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useAppStore, Category } from "@/store/useAppStore";

const categories: Category[] = ["For You", "Founders", "Tech", "Science", "Space"];

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory, darkMode } = useAppStore();

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
                  : "#FFFFFF",
                borderColor: isActive
                  ? "#E63329"
                  : darkMode
                  ? "#444"
                  : "#E5E5E5",
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
              {cat}
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
