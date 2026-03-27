import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useAppStore } from "@/store/useAppStore";
import { storyBubbles } from "@/data/articles";

export default function StoryBubbles() {
  const darkMode = useAppStore((s) => s.darkMode);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      style={{ marginBottom: 12 }}
    >
      {storyBubbles.map((bubble) => (
        <Pressable key={bubble.id} style={{ alignItems: "center", width: 68 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              padding: 2,
              borderWidth: 2.5,
              borderColor: bubble.hasNew ? "#E63329" : darkMode ? "#555" : "#DDD",
            }}
          >
            <Image
              source={{ uri: bubble.imageUrl }}
              style={{ width: "100%", height: "100%", borderRadius: 30 }}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 11,
              marginTop: 4,
              color: darkMode ? "#CCC" : "#555",
              fontFamily: "DMSans_500Medium",
            }}
          >
            {bubble.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
