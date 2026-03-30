import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Animated,
  Switch,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const interestLabels: Record<string, { label: string; icon: string }> = {
  founders: { label: "Founders & CEOs", icon: "people" },
  tech: { label: "Technology", icon: "hardware-chip" },
  science: { label: "Science", icon: "flask" },
  space: { label: "Space & Cosmos", icon: "planet" },
  ai: { label: "AI & Machine Learning", icon: "sparkles" },
  startups: { label: "Startups & VC", icon: "rocket" },
};

export default function ProfileSheet() {
  const {
    profileVisible,
    setProfileVisible,
    darkMode,
    toggleDarkMode,
    interests,
    toggleInterest,
    likedArticles,
    savedArticles,
    user,
  } = useAppStore();

  const userEmail = user?.email ?? "user@breakthrough.app";
  const userInitial = userEmail.charAt(0).toUpperCase();

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (profileVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 25,
        stiffness: 200,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [profileVisible]);

  const close = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setProfileVisible(false));
  };

  const bg = darkMode ? "#1A1A1A" : "#FFFFFF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";
  const cardBg = darkMode ? "#2A2A2A" : "#F7F4EF";

  return (
    <Modal visible={profileVisible} transparent animationType="none" statusBarTranslucent>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={close} />
        <Animated.View
          style={[styles.sheet, { backgroundColor: bg, transform: [{ translateY }] }]}
        >
          <View style={styles.handleBar}>
            <View style={[styles.handle, { backgroundColor: darkMode ? "#555" : "#DDD" }]} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Profile header */}
            <View style={styles.profileHeader}>
              <View style={[styles.avatarCircle, { backgroundColor: "#E63329" }]}>
                <Text style={styles.avatarInitial}>{userInitial}</Text>
              </View>
              <Text style={[styles.userName, { color: textColor }]}>{userEmail}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                <Ionicons name="heart" size={20} color="#E63329" />
                <Text style={[styles.statNumber, { color: textColor }]}>
                  {likedArticles.size}
                </Text>
                <Text style={[styles.statLabel, { color: mutedText }]}>Liked</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                <Ionicons name="bookmark" size={20} color="#E63329" />
                <Text style={[styles.statNumber, { color: textColor }]}>
                  {savedArticles.size}
                </Text>
                <Text style={[styles.statLabel, { color: mutedText }]}>Saved</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                <Ionicons name="eye" size={20} color="#E63329" />
                <Text style={[styles.statNumber, { color: textColor }]}>47</Text>
                <Text style={[styles.statLabel, { color: mutedText }]}>Read</Text>
              </View>
            </View>

            {/* Dark mode toggle */}
            <View style={[styles.section, { borderTopColor: darkMode ? "#333" : "#EEE" }]}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Appearance</Text>
              <View style={[styles.settingRow, { backgroundColor: cardBg }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Ionicons
                    name={darkMode ? "moon" : "sunny"}
                    size={22}
                    color={darkMode ? "#FFD700" : "#FF8C00"}
                  />
                  <Text style={[styles.settingLabel, { color: textColor }]}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: "#DDD", true: "#E63329" }}
                  thumbColor="#FFF"
                />
              </View>
            </View>

            {/* Interest toggles */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Your Interests</Text>
              <Text style={[styles.sectionSubtitle, { color: mutedText }]}>
                Customize your feed by toggling topics
              </Text>

              {Object.entries(interestLabels).map(([key, { label, icon }]) => (
                <View key={key} style={[styles.settingRow, { backgroundColor: cardBg }]}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Ionicons name={icon as any} size={20} color="#E63329" />
                    <Text style={[styles.settingLabel, { color: textColor }]}>{label}</Text>
                  </View>
                  <Switch
                    value={interests[key as keyof typeof interests]}
                    onValueChange={() => toggleInterest(key as keyof typeof interests)}
                    trackColor={{ false: "#DDD", true: "#E63329" }}
                    thumbColor="#FFF"
                  />
                </View>
              ))}
            </View>

            {/* Menu items */}
            <View style={styles.section}>
              {["Reading History", "Notifications", "Help & Support", "About"].map((item) => (
                <Pressable key={item} style={[styles.menuItem, { backgroundColor: cardBg }]}>
                  <Text style={[styles.settingLabel, { color: textColor }]}>{item}</Text>
                  <Ionicons name="chevron-forward" size={18} color={mutedText} />
                </Pressable>
              ))}

              <Pressable
                style={[styles.menuItem, { backgroundColor: cardBg, marginTop: 8 }]}
                onPress={async () => {
                  await supabase.auth.signOut();
                  close();
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Ionicons name="log-out-outline" size={20} color="#E63329" />
                  <Text style={[styles.settingLabel, { color: "#E63329" }]}>Sign Out</Text>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.5)" },
  sheet: {
    height: SCREEN_HEIGHT * 0.85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  handleBar: { alignItems: "center", paddingVertical: 10 },
  handle: { width: 40, height: 4, borderRadius: 2 },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarInitial: {
    color: "#FFF",
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  userName: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
  },
  userEmail: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 8,
  },
});
