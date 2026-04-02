import { create } from "zustand";
import { Article } from "@/data/articles";
import { Session, User } from "@supabase/supabase-js";
import {
  fetchSavedArticleIds,
  addSaveToDb,
  removeSaveFromDb,
} from "@/lib/savedArticles";

export type Category = "For You" | "Founders" | "Tech" | "Science" | "Space";

interface UserInterests {
  founders: boolean;
  tech: boolean;
  science: boolean;
  space: boolean;
  ai: boolean;
  startups: boolean;
}

interface AppState {
  // Auth
  session: Session | null;
  user: User | null;
  setSession: (session: Session | null) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;

  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;

  likedArticles: Set<string>;
  toggleLike: (id: string) => void;

  savedArticles: Set<string>;
  toggleSave: (id: string) => void;
  loadSavedArticles: () => Promise<void>;

  selectedArticleId: string | null;
  setSelectedArticle: (id: string | null) => void;

  profileVisible: boolean;
  setProfileVisible: (v: boolean) => void;

  interests: UserInterests;
  toggleInterest: (key: keyof UserInterests) => void;

  // Onboarding
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (v: boolean) => void;

  // AI-generated feed
  generatedArticles: Record<string, Article[]>;
  feedLoading: boolean;
  feedError: string | null;
  setGeneratedArticles: (category: string, articles: Article[]) => void;
  setFeedLoading: (loading: boolean) => void;
  setFeedError: (error: string | null) => void;
  clearCategoryCache: (category: string) => void;
  refreshKey: number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  session: null,
  user: null,
  setSession: (session) =>
    set({ session, user: session?.user ?? null }),

  darkMode: false,
  toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),

  activeCategory: "For You",
  setActiveCategory: (cat) => set({ activeCategory: cat }),

  likedArticles: new Set(),
  toggleLike: (id) =>
    set((s) => {
      const next = new Set(s.likedArticles);
      next.has(id) ? next.delete(id) : next.add(id);
      return { likedArticles: next };
    }),

  savedArticles: new Set(),
  toggleSave: (id) => {
    const { user, savedArticles } = get();
    const wasSaved = savedArticles.has(id);
    const next = new Set(savedArticles);
    wasSaved ? next.delete(id) : next.add(id);
    set({ savedArticles: next });

    // Sync to Supabase in background
    if (user) {
      if (wasSaved) {
        removeSaveFromDb(user.id, id);
      } else {
        addSaveToDb(user.id, id);
      }
    }
  },

  loadSavedArticles: async () => {
    const { user } = get();
    if (!user) return;
    const ids = await fetchSavedArticleIds(user.id);
    set({ savedArticles: new Set(ids) });
  },

  selectedArticleId: null,
  setSelectedArticle: (id) => set({ selectedArticleId: id }),

  profileVisible: false,
  setProfileVisible: (v) => set({ profileVisible: v }),

  interests: {
    founders: true,
    tech: true,
    science: false,
    space: true,
    ai: true,
    startups: false,
  },
  toggleInterest: (key) =>
    set((s) => ({
      interests: { ...s.interests, [key]: !s.interests[key] },
    })),

  // Onboarding
  hasSeenOnboarding: false,
  setHasSeenOnboarding: (v) => set({ hasSeenOnboarding: v }),

  // AI-generated feed
  generatedArticles: {},
  feedLoading: false,
  feedError: null,
  setGeneratedArticles: (category, articles) =>
    set((s) => ({
      generatedArticles: { ...s.generatedArticles, [category]: articles },
    })),
  setFeedLoading: (loading) => set({ feedLoading: loading }),
  setFeedError: (error) => set({ feedError: error }),
  clearCategoryCache: (category) =>
    set((s) => {
      const next = { ...s.generatedArticles };
      delete next[category];
      return { generatedArticles: next, refreshKey: s.refreshKey + 1 };
    }),
  refreshKey: 0,
}));
