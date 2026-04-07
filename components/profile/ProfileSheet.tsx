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
import { t, Language, languageLabels } from "@/lib/i18n";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const interestIcons: Record<string, string> = {
  founders: "people",
  tech: "hardware-chip",
  science: "flask",
  space: "planet",
  ai: "sparkles",
  startups: "rocket",
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
    language,
    setLanguage,
  } = useAppStore();

  const i18n = t(language);

  const interestLabelMap: Record<string, string> = {
    founders: i18n.foundersCEOs,
    tech: i18n.technology,
    science: i18n.scienceLabel,
    space: i18n.spaceCosmos,
    ai: i18n.aiMl,
    startups: i18n.startupsVc,
  };

  const languages: Language[] = ["en", "zh", "ms"];

  const userEmail = user?.email ?? "user@spark.app";
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
                <Text style={[styles.statLabel, { color: mutedText }]}>{i18n.liked}</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                <Ionicons name="bookmark" size={20} color="#E63329" />
                <Text style={[styles.statNumber, { color: textColor }]}>
                  {savedArticles.size}
                </Text>
                <Text style={[styles.statLabel, { color: mutedText }]}>{i18n.saved}</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                <Ionicons name="eye" size={20} color="#E63329" />
                <Text style={[styles.statNumber, { color: textColor }]}>47</Text>
                <Text style={[styles.statLabel, { color: mutedText }]}>{i18n.read}</Text>
              </View>
            </View>

            {/* Dark mode toggle */}
            <View style={[styles.section, { borderTopColor: darkMode ? "#333" : "#EEE" }]}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>{i18n.appearance}</Text>
              <View style={[styles.settingRow, { backgroundColor: cardBg }]}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Ionicons
                    name={darkMode ? "moon" : "sunny"}
                    size={22}
                    color={darkMode ? "#FFD700" : "#FF8C00"}
                  />
                  <Text style={[styles.settingLabel, { color: textColor }]}>{i18n.darkMode}</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: "#DDD", true: "#E63329" }}
                  thumbColor="#FFF"
                />
              </View>
            </View>

            {/* Language selector */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>{i18n.language}</Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {languages.map((lang) => (
                  <Pressable
                    key={lang}
                    onPress={() => setLanguage(lang)}
                    style={[
                      styles.langButton,
                      {
                        backgroundColor: language === lang ? "#E63329" : cardBg,
                        borderColor: language === lang ? "#E63329" : darkMode ? "#444" : "#E5E5E5",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.langButtonText,
                        { color: language === lang ? "#FFF" : textColor },
                      ]}
                    >
                      {languageLabels[lang]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Interest toggles */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>{i18n.yourInterests}</Text>
              <Text style={[styles.sectionSubtitle, { color: mutedText }]}>
                {i18n.customizeFeed}
              </Text>

              {Object.entries(interestIcons).map(([key, icon]) => (
                <View key={key} style={[styles.settingRow, { backgroundColor: cardBg }]}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Ionicons name={icon as any} size={20} color="#E63329" />
                    <Text style={[styles.settingLabel, { color: textColor }]}>{interestLabelMap[key]}</Text>
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
              {[i18n.readingHistory, i18n.notifications, i18n.helpSupport, i18n.about].map((item) => (
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
                  <Text style={[styles.settingLabel, { color: "#E63329" }]}>{i18n.signOut}</Text>
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
  langButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  langButtonText: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
  },
});
