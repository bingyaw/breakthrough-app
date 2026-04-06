import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import StoryBubbles from "@/components/feed/StoryBubbles";
import CategoryTabs from "@/components/feed/CategoryTabs";
import MasonryFeed from "@/components/feed/MasonryFeed";
import FounderSpotlightSection from "@/components/feed/FounderSpotlightSection";
import ArticleDetailSheet from "@/components/article/ArticleDetailSheet";
import ProfileSheet from "@/components/profile/ProfileSheet";
import SearchModal from "@/components/SearchModal";

export default function HomeScreen() {
  const { darkMode, setProfileVisible, activeCategory, clearCategoryCache, feedLoading } =
    useAppStore();
  const insets = useSafeAreaInsets();
  const [searchVisible, setSearchVisible] = useState(false);

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";

  const handleRefresh = useCallback(() => {
    clearCategoryCache(activeCategory);
  }, [activeCategory, clearCategoryCache]);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View>
          <Text style={[styles.logo, { color: "#E63329" }]}>Spark</Text>
          <Text style={[styles.tagline, { color: darkMode ? "#888" : "#999" }]}>
            Ignite your curiosity
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable
            onPress={handleRefresh}
            style={[styles.iconBtn, { backgroundColor: darkMode ? "#2A2A2A" : "#FFF" }]}
          >
            {feedLoading ? (
              <ActivityIndicator size="small" color="#E63329" />
            ) : (
              <Ionicons name="refresh" size={20} color="#E63329" />
            )}
          </Pressable>
          <Pressable
            onPress={() => setSearchVisible(true)}
            style={[styles.iconBtn, { backgroundColor: darkMode ? "#2A2A2A" : "#FFF" }]}
          >
            <Ionicons name="search" size={20} color={textColor} />
          </Pressable>
          <Pressable
            onPress={() => setProfileVisible(true)}
            style={[styles.iconBtn, { backgroundColor: darkMode ? "#2A2A2A" : "#FFF" }]}
          >
            <Ionicons name="person-circle-outline" size={22} color={textColor} />
          </Pressable>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Story Bubbles */}
        <StoryBubbles />

        {/* Category Tabs */}
        <CategoryTabs />

        {/* Founder Spotlight (show on For You and Founders tabs) */}
        {(activeCategory === "For You" || activeCategory === "Founders") && (
          <FounderSpotlightSection />
        )}

        {/* Masonry Feed */}
        <MasonryFeed />

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Article Detail Bottom Sheet */}
      <ArticleDetailSheet />

      {/* Search Modal */}
      <SearchModal visible={searchVisible} onClose={() => setSearchVisible(false)} />

      {/* Profile Sheet */}
      <ProfileSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    marginTop: 1,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
});
