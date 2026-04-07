import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";
import { founderSpotlights } from "@/data/articles";

export default function FounderSpotlightSection() {
  const darkMode = useAppStore((s) => s.darkMode);
  const language = useAppStore((s) => s.language);
  const i18n = t(language);

  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { color: darkMode ? "#F5F5F5" : "#1A1A1A" }]}>
          {i18n.founderSpotlight}
        </Text>
        <Pressable>
          <Text style={styles.seeAll}>{i18n.seeAll}</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {founderSpotlights.map((founder) => (
          <Pressable key={founder.id} style={styles.card}>
            <Image
              source={{ uri: founder.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)"]}
              style={styles.gradient}
            >
              <Text style={styles.founderName}>{founder.name}</Text>
              <Text style={styles.company}>{founder.company}</Text>
              <Text numberOfLines={2} style={styles.founderTitle}>
                {founder.title}
              </Text>
            </LinearGradient>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
  },
  seeAll: {
    fontSize: 13,
    color: "#E63329",
    fontFamily: "DMSans_500Medium",
  },
  card: {
    width: 160,
    height: 210,
    borderRadius: 14,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    paddingTop: 40,
  },
  founderName: {
    color: "#FFF",
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
  },
  company: {
    color: "#E63329",
    fontSize: 11,
    fontFamily: "DMSans_700Bold",
    marginTop: 1,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  founderTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
    marginTop: 3,
    lineHeight: 14,
  },
});
