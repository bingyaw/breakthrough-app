import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Modal,
  Image,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppStore } from "@/store/useAppStore";
import { articles as staticArticles, Article } from "@/data/articles";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SearchModal({ visible, onClose }: Props) {
  const { darkMode, generatedArticles, setSelectedArticle } = useAppStore();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const cardBg = darkMode ? "#2A2A2A" : "#FFFFFF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const subtextColor = darkMode ? "#888" : "#999";
  const inputBg = darkMode ? "#2A2A2A" : "#FFFFFF";

  // Combine static + generated articles, deduplicated by id
  const allArticles = useMemo(() => {
    const map = new Map<string, Article>();
    staticArticles.forEach((a) => map.set(a.id, a));
    Object.values(generatedArticles)
      .flat()
      .forEach((a) => map.set(a.id, a));
    return Array.from(map.values());
  }, [generatedArticles]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allArticles.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        (a.subtitle?.toLowerCase().includes(q) ?? false) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, allArticles]);

  // Focus input when modal opens
  useEffect(() => {
    if (visible) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [visible]);

  const handleSelect = (id: string) => {
    Keyboard.dismiss();
    onClose();
    setSelectedArticle(id);
  };

  const renderResult = ({ item }: { item: Article }) => (
    <Pressable
      onPress={() => handleSelect(item.id)}
      style={[styles.resultCard, { backgroundColor: cardBg }]}
    >
      <View style={styles.resultContent}>
        <Text numberOfLines={2} style={[styles.resultTitle, { color: textColor }]}>
          {item.title}
        </Text>
        <View style={styles.resultMeta}>
          <Text style={[styles.resultCategory, { color: "#E63329" }]}>
            {item.category}
          </Text>
          <Text style={[styles.resultDot, { color: subtextColor }]}>·</Text>
          <Text style={[styles.resultAuthor, { color: subtextColor }]}>
            {item.author}
          </Text>
        </View>
        {item.tags.length > 0 && (
          <View style={styles.tagRow}>
            {item.tags.slice(0, 3).map((tag) => (
              <View
                key={tag}
                style={[styles.tag, { backgroundColor: darkMode ? "#333" : "#F0EDEA" }]}
              >
                <Text style={[styles.tagText, { color: darkMode ? "#AAA" : "#666" }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={subtextColor} />
    </Pressable>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={[styles.container, { backgroundColor: bg, paddingTop: insets.top }]}>
        {/* Search bar */}
        <View style={styles.searchRow}>
          <View style={[styles.inputWrapper, { backgroundColor: inputBg }]}>
            <Ionicons name="search" size={18} color={subtextColor} />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Search articles, topics, tags…"
              placeholderTextColor={subtextColor}
              style={[styles.input, { color: textColor }]}
              autoCorrect={false}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")} hitSlop={8}>
                <Ionicons name="close-circle" size={18} color={subtextColor} />
              </Pressable>
            )}
          </View>
          <Pressable onPress={onClose} hitSlop={8}>
            <Text style={[styles.cancelText, { color: "#E63329" }]}>Cancel</Text>
          </Pressable>
        </View>

        {/* Results */}
        {query.trim().length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={subtextColor} />
            <Text style={[styles.emptyText, { color: subtextColor }]}>
              Search by title, category, or tags
            </Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="alert-circle-outline" size={48} color={subtextColor} />
            <Text style={[styles.emptyText, { color: subtextColor }]}>
              No results for "{query}"
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderResult}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
  },
  cancelText: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  resultContent: {
    flex: 1,
    marginRight: 8,
  },
  resultTitle: {
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    lineHeight: 20,
    marginBottom: 6,
  },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  resultCategory: {
    fontSize: 12,
    fontFamily: "DMSans_700Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  resultDot: {
    fontSize: 12,
  },
  resultAuthor: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
  },
  tagRow: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontFamily: "DMSans_400Regular",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingBottom: 80,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
  },
});
