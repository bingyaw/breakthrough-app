import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ViewToken,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { t } from "@/lib/i18n";

const { width, height } = Dimensions.get("window");

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  gradientColors: [string, string, string];
}

const slideConfigs: Omit<Slide, "title" | "subtitle">[] = [
  { id: "1", icon: "flash", gradientColors: ["#E63329", "#B8281F", "#8C1D17"] },
  { id: "2", icon: "person", gradientColors: ["#FF4D44", "#E63329", "#B8281F"] },
  { id: "3", icon: "bookmark", gradientColors: ["#E63329", "#C92E25", "#991F18"] },
];

export default function OnboardingScreen() {
  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);
  const language = useAppStore((s) => s.language);
  const i18n = t(language);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const slides: Slide[] = slideConfigs.map((config, idx) => ({
    ...config,
    title: [i18n.onboardingTitle1, i18n.onboardingTitle2, i18n.onboardingTitle3][idx],
    subtitle: [i18n.onboardingSubtitle1, i18n.onboardingSubtitle2, i18n.onboardingSubtitle3][idx],
  }));

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setHasSeenOnboarding(true);
    }
  };

  const renderSlide = ({ item, index }: { item: Slide; index: number }) => (
    <LinearGradient colors={item.gradientColors} style={styles.slide}>
      <View style={styles.content}>
        {index === 0 ? (
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>S</Text>
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={64} color="#fff" />
          </View>
        )}

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? i18n.getStarted : i18n.next}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      renderItem={renderSlide}
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    width,
    height,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 72,
    color: "#fff",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  title: {
    fontFamily: "DMSans_700Bold",
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: "DMSans_400Regular",
    fontSize: 17,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    paddingBottom: 60,
    paddingHorizontal: 40,
    alignItems: "center",
    gap: 28,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: "#fff",
  },
  dotInactive: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  button: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "DMSans_700Bold",
    fontSize: 17,
    color: "#E63329",
  },
});
