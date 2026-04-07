import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

export default function TabLayout() {
  const darkMode = useAppStore((s) => s.darkMode);
  const language = useAppStore((s) => s.language);
  const i18n = t(language);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E63329",
        tabBarInactiveTintColor: darkMode ? "#888" : "#999",
        tabBarStyle: {
          backgroundColor: darkMode ? "#1A1A1A" : "#FFFFFF",
          borderTopColor: darkMode ? "#333" : "#EEE",
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.home,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: i18n.discoverTab,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: i18n.savedTab,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
