import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ShimmerPlaceholder from "@/components/ShimmerPlaceholder";
import { useAppStore } from "@/store/useAppStore";

const CARD_GAP = 10;
const PADDING = 16;
const CARD_WIDTH = (Dimensions.get("window").width - PADDING * 2 - CARD_GAP) / 2;

const imageHeights = [180, 140, 160, 200, 150, 170];

function SkeletonCard({ index, darkMode }: { index: number; darkMode: boolean }) {
  const imgHeight = imageHeights[index % imageHeights.length];
  const cardBg = darkMode ? "#2A2A2A" : "#FFFFFF";

  return (
    <View style={[styles.card, { width: CARD_WIDTH, backgroundColor: cardBg }]}>
      <ShimmerPlaceholder width={CARD_WIDTH} height={imgHeight} borderRadius={0} darkMode={darkMode} />
      <View style={styles.content}>
        <ShimmerPlaceholder width={CARD_WIDTH - 20} height={14} borderRadius={4} darkMode={darkMode} />
        <ShimmerPlaceholder
          width={(CARD_WIDTH - 20) * 0.7}
          height={14}
          borderRadius={4}
          darkMode={darkMode}
          style={{ marginTop: 6 }}
        />
        <View style={styles.authorRow}>
          <ShimmerPlaceholder width={18} height={18} borderRadius={9} darkMode={darkMode} />
          <ShimmerPlaceholder width={60} height={10} borderRadius={4} darkMode={darkMode} />
        </View>
        <View style={styles.actionsRow}>
          <ShimmerPlaceholder width={40} height={12} borderRadius={4} darkMode={darkMode} />
          <ShimmerPlaceholder width={16} height={16} borderRadius={4} darkMode={darkMode} />
        </View>
      </View>
    </View>
  );
}

export default function SkeletonFeed() {
  const darkMode = useAppStore((s) => s.darkMode);

  const leftIndices = [0, 2, 4];
  const rightIndices = [1, 3, 5];

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {leftIndices.map((i) => (
          <SkeletonCard key={i} index={i} darkMode={darkMode} />
        ))}
      </View>
      <View style={styles.column}>
        {rightIndices.map((i) => (
          <SkeletonCard key={i} index={i} darkMode={darkMode} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: PADDING,
    gap: CARD_GAP,
  },
  column: {
    flex: 1,
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: CARD_GAP,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    padding: 10,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
