import { getLocales } from "expo-localization";

export type Language = "en" | "zh" | "ms";

export const languageLabels: Record<Language, string> = {
  en: "English",
  zh: "简体中文",
  ms: "Bahasa Malaysia",
};

type TranslationKeys = {
  // Header
  tagline: string;

  // Auth screen
  authTagline: string;
  logIn: string;
  signUp: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  createAccount: string;
  or: string;
  continueWithGoogle: string;
  emailPasswordRequired: string;
  checkEmailConfirm: string;

  // Onboarding
  onboardingTitle1: string;
  onboardingSubtitle1: string;
  onboardingTitle2: string;
  onboardingSubtitle2: string;
  onboardingTitle3: string;
  onboardingSubtitle3: string;
  next: string;
  getStarted: string;

  // Category tabs
  forYou: string;
  founders: string;
  tech: string;
  science: string;
  space: string;

  // Profile sheet
  appearance: string;
  darkMode: string;
  language: string;
  yourInterests: string;
  customizeFeed: string;
  foundersCEOs: string;
  technology: string;
  scienceLabel: string;
  spaceCosmos: string;
  aiMl: string;
  startupsVc: string;
  readingHistory: string;
  notifications: string;
  helpSupport: string;
  about: string;
  signOut: string;
  liked: string;
  saved: string;
  read: string;

  // Discover screen
  discover: string;
  searchStoriesPlaceholder: string;
  trendingTopics: string;
  searchResults: string;
  topStories: string;

  // Trending topics
  aiRevolution: string;
  marsMission: string;
  geneEditing: string;
  startupFunding: string;
  quantumComputing: string;
  fiveGNetworks: string;

  // Saved screen
  savedTitle: string;
  article: string;
  articles: string;
  noSavedArticles: string;
  tapBookmarkHint: string;

  // Article detail
  readSuffix: string;
  relatedArticles: string;
  like: string;
  likedAction: string;
  save: string;
  savedAction: string;
  share: string;

  // Search modal
  searchArticlesPlaceholder: string;
  cancel: string;
  searchByHint: string;
  noResultsFor: string;

  // Founder spotlight
  founderSpotlight: string;
  seeAll: string;

  // Tabs
  home: string;
  discoverTab: string;
  savedTab: string;

  // Posts suffix
  posts: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    // Header
    tagline: "Ignite your curiosity",

    // Auth screen
    authTagline: "Ignite your curiosity",
    logIn: "Log In",
    signUp: "Sign Up",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    createAccount: "Create Account",
    or: "or",
    continueWithGoogle: "Continue with Google",
    emailPasswordRequired: "Please enter both email and password.",
    checkEmailConfirm: "Check your email to confirm your account!",

    // Onboarding
    onboardingTitle1: "Discover What's Next",
    onboardingSubtitle1: "AI-curated stories from science, tech and founders",
    onboardingTitle2: "Personalized For You",
    onboardingSubtitle2:
      "Toggle your interests and get stories tailored to what you care about",
    onboardingTitle3: "Save & Share",
    onboardingSubtitle3:
      "Save inspiring stories and share them with your network",
    next: "Next",
    getStarted: "Get Started",

    // Category tabs
    forYou: "For You",
    founders: "Founders",
    tech: "Tech",
    science: "Science",
    space: "Space",

    // Profile sheet
    appearance: "Appearance",
    darkMode: "Dark Mode",
    language: "Language",
    yourInterests: "Your Interests",
    customizeFeed: "Customize your feed by toggling topics",
    foundersCEOs: "Founders & CEOs",
    technology: "Technology",
    scienceLabel: "Science",
    spaceCosmos: "Space & Cosmos",
    aiMl: "AI & Machine Learning",
    startupsVc: "Startups & VC",
    readingHistory: "Reading History",
    notifications: "Notifications",
    helpSupport: "Help & Support",
    about: "About",
    signOut: "Sign Out",
    liked: "Liked",
    saved: "Saved",
    read: "Read",

    // Discover screen
    discover: "Discover",
    searchStoriesPlaceholder: "Search stories, topics, founders...",
    trendingTopics: "Trending Topics",
    searchResults: "Search Results",
    topStories: "Top Stories",

    // Trending topics
    aiRevolution: "AI Revolution",
    marsMission: "Mars Mission",
    geneEditing: "Gene Editing",
    startupFunding: "Startup Funding",
    quantumComputing: "Quantum Computing",
    fiveGNetworks: "5G Networks",

    // Saved screen
    savedTitle: "Saved",
    article: "article",
    articles: "articles",
    noSavedArticles: "No saved articles yet",
    tapBookmarkHint: "Tap the bookmark icon on any article to save it here",

    // Article detail
    readSuffix: "read",
    relatedArticles: "Related Articles",
    like: "Like",
    likedAction: "Liked",
    save: "Save",
    savedAction: "Saved",
    share: "Share",

    // Search modal
    searchArticlesPlaceholder: "Search articles, topics, tags\u2026",
    cancel: "Cancel",
    searchByHint: "Search by title, category, or tags",
    noResultsFor: "No results for",

    // Founder spotlight
    founderSpotlight: "\uD83D\uDD25 Founder Spotlight",
    seeAll: "See All",

    // Tabs
    home: "Home",
    discoverTab: "Discover",
    savedTab: "Saved",

    // Posts suffix
    posts: "posts",
  },

  zh: {
    // Header
    tagline: "\u70B9\u71C3\u4F60\u7684\u597D\u5947\u5FC3",

    // Auth screen
    authTagline: "\u70B9\u71C3\u4F60\u7684\u597D\u5947\u5FC3",
    logIn: "\u767B\u5F55",
    signUp: "\u6CE8\u518C",
    emailPlaceholder: "\u7535\u5B50\u90AE\u4EF6\u5730\u5740",
    passwordPlaceholder: "\u5BC6\u7801",
    createAccount: "\u521B\u5EFA\u8D26\u6237",
    or: "\u6216",
    continueWithGoogle: "\u4F7F\u7528 Google \u7EE7\u7EED",
    emailPasswordRequired: "\u8BF7\u8F93\u5165\u7535\u5B50\u90AE\u4EF6\u548C\u5BC6\u7801\u3002",
    checkEmailConfirm: "\u8BF7\u68C0\u67E5\u60A8\u7684\u7535\u5B50\u90AE\u4EF6\u4EE5\u786E\u8BA4\u60A8\u7684\u8D26\u6237\uFF01",

    // Onboarding
    onboardingTitle1: "\u53D1\u73B0\u672A\u6765",
    onboardingSubtitle1: "AI \u7CBE\u9009\u7684\u79D1\u5B66\u3001\u79D1\u6280\u548C\u521B\u59CB\u4EBA\u6545\u4E8B",
    onboardingTitle2: "\u4E13\u5C5E\u4E8E\u4F60",
    onboardingSubtitle2: "\u5207\u6362\u4F60\u7684\u5174\u8DA3\uFF0C\u83B7\u53D6\u4E3A\u4F60\u91CF\u8EAB\u5B9A\u5236\u7684\u6545\u4E8B",
    onboardingTitle3: "\u4FDD\u5B58\u4E0E\u5206\u4EAB",
    onboardingSubtitle3: "\u4FDD\u5B58\u7CBE\u5F69\u6545\u4E8B\uFF0C\u4E0E\u4F60\u7684\u670B\u53CB\u5206\u4EAB",
    next: "\u4E0B\u4E00\u6B65",
    getStarted: "\u5F00\u59CB\u4F7F\u7528",

    // Category tabs
    forYou: "\u4E3A\u4F60\u63A8\u8350",
    founders: "\u521B\u59CB\u4EBA",
    tech: "\u79D1\u6280",
    science: "\u79D1\u5B66",
    space: "\u592A\u7A7A",

    // Profile sheet
    appearance: "\u5916\u89C2",
    darkMode: "\u6DF1\u8272\u6A21\u5F0F",
    language: "\u8BED\u8A00",
    yourInterests: "\u4F60\u7684\u5174\u8DA3",
    customizeFeed: "\u5207\u6362\u4E3B\u9898\u6765\u81EA\u5B9A\u4E49\u4F60\u7684\u4FE1\u606F\u6D41",
    foundersCEOs: "\u521B\u59CB\u4EBA\u4E0E CEO",
    technology: "\u79D1\u6280",
    scienceLabel: "\u79D1\u5B66",
    spaceCosmos: "\u592A\u7A7A\u4E0E\u5B87\u5B99",
    aiMl: "\u4EBA\u5DE5\u667A\u80FD\u4E0E\u673A\u5668\u5B66\u4E60",
    startupsVc: "\u521B\u4E1A\u4E0E\u98CE\u6295",
    readingHistory: "\u9605\u8BFB\u5386\u53F2",
    notifications: "\u901A\u77E5",
    helpSupport: "\u5E2E\u52A9\u4E0E\u652F\u6301",
    about: "\u5173\u4E8E",
    signOut: "\u9000\u51FA\u767B\u5F55",
    liked: "\u5DF2\u559C\u6B22",
    saved: "\u5DF2\u4FDD\u5B58",
    read: "\u5DF2\u8BFB",

    // Discover screen
    discover: "\u53D1\u73B0",
    searchStoriesPlaceholder: "\u641C\u7D22\u6545\u4E8B\u3001\u4E3B\u9898\u3001\u521B\u59CB\u4EBA...",
    trendingTopics: "\u70ED\u95E8\u8BDD\u9898",
    searchResults: "\u641C\u7D22\u7ED3\u679C",
    topStories: "\u70ED\u95E8\u6545\u4E8B",

    // Trending topics
    aiRevolution: "\u4EBA\u5DE5\u667A\u80FD\u9769\u547D",
    marsMission: "\u706B\u661F\u4EFB\u52A1",
    geneEditing: "\u57FA\u56E0\u7F16\u8F91",
    startupFunding: "\u521B\u4E1A\u878D\u8D44",
    quantumComputing: "\u91CF\u5B50\u8BA1\u7B97",
    fiveGNetworks: "5G \u7F51\u7EDC",

    // Saved screen
    savedTitle: "\u5DF2\u4FDD\u5B58",
    article: "\u7BC7\u6587\u7AE0",
    articles: "\u7BC7\u6587\u7AE0",
    noSavedArticles: "\u6682\u65E0\u4FDD\u5B58\u7684\u6587\u7AE0",
    tapBookmarkHint: "\u70B9\u51FB\u4EFB\u4F55\u6587\u7AE0\u4E0A\u7684\u4E66\u7B7E\u56FE\u6807\u5373\u53EF\u4FDD\u5B58",

    // Article detail
    readSuffix: "\u9605\u8BFB",
    relatedArticles: "\u76F8\u5173\u6587\u7AE0",
    like: "\u559C\u6B22",
    likedAction: "\u5DF2\u559C\u6B22",
    save: "\u4FDD\u5B58",
    savedAction: "\u5DF2\u4FDD\u5B58",
    share: "\u5206\u4EAB",

    // Search modal
    searchArticlesPlaceholder: "\u641C\u7D22\u6587\u7AE0\u3001\u4E3B\u9898\u3001\u6807\u7B7E\u2026",
    cancel: "\u53D6\u6D88",
    searchByHint: "\u6309\u6807\u9898\u3001\u5206\u7C7B\u6216\u6807\u7B7E\u641C\u7D22",
    noResultsFor: "\u65E0\u641C\u7D22\u7ED3\u679C",

    // Founder spotlight
    founderSpotlight: "\uD83D\uDD25 \u521B\u59CB\u4EBA\u805A\u7126",
    seeAll: "\u67E5\u770B\u5168\u90E8",

    // Tabs
    home: "\u9996\u9875",
    discoverTab: "\u53D1\u73B0",
    savedTab: "\u5DF2\u4FDD\u5B58",

    // Posts suffix
    posts: "\u7BC7\u5E16\u5B50",
  },

  ms: {
    // Header
    tagline: "Nyalakan rasa ingin tahu anda",

    // Auth screen
    authTagline: "Nyalakan rasa ingin tahu anda",
    logIn: "Log Masuk",
    signUp: "Daftar",
    emailPlaceholder: "Alamat e-mel",
    passwordPlaceholder: "Kata laluan",
    createAccount: "Cipta Akaun",
    or: "atau",
    continueWithGoogle: "Teruskan dengan Google",
    emailPasswordRequired: "Sila masukkan e-mel dan kata laluan.",
    checkEmailConfirm: "Semak e-mel anda untuk mengesahkan akaun!",

    // Onboarding
    onboardingTitle1: "Terokai Masa Depan",
    onboardingSubtitle1:
      "Cerita pilihan AI daripada sains, teknologi dan pengasas",
    onboardingTitle2: "Diperibadikan Untuk Anda",
    onboardingSubtitle2:
      "Togol minat anda dan dapatkan cerita yang disesuaikan untuk anda",
    onboardingTitle3: "Simpan & Kongsi",
    onboardingSubtitle3:
      "Simpan cerita inspirasi dan kongsi dengan rangkaian anda",
    next: "Seterusnya",
    getStarted: "Mula",

    // Category tabs
    forYou: "Untuk Anda",
    founders: "Pengasas",
    tech: "Teknologi",
    science: "Sains",
    space: "Angkasa",

    // Profile sheet
    appearance: "Penampilan",
    darkMode: "Mod Gelap",
    language: "Bahasa",
    yourInterests: "Minat Anda",
    customizeFeed: "Sesuaikan suapan anda dengan menogol topik",
    foundersCEOs: "Pengasas & CEO",
    technology: "Teknologi",
    scienceLabel: "Sains",
    spaceCosmos: "Angkasa & Kosmos",
    aiMl: "AI & Pembelajaran Mesin",
    startupsVc: "Syarikat Rintisan & VC",
    readingHistory: "Sejarah Bacaan",
    notifications: "Pemberitahuan",
    helpSupport: "Bantuan & Sokongan",
    about: "Perihal",
    signOut: "Log Keluar",
    liked: "Disukai",
    saved: "Disimpan",
    read: "Dibaca",

    // Discover screen
    discover: "Terokai",
    searchStoriesPlaceholder: "Cari cerita, topik, pengasas...",
    trendingTopics: "Topik Trending",
    searchResults: "Hasil Carian",
    topStories: "Cerita Teratas",

    // Trending topics
    aiRevolution: "Revolusi AI",
    marsMission: "Misi Marikh",
    geneEditing: "Penyuntingan Gen",
    startupFunding: "Pembiayaan Rintisan",
    quantumComputing: "Pengkomputeran Kuantum",
    fiveGNetworks: "Rangkaian 5G",

    // Saved screen
    savedTitle: "Disimpan",
    article: "artikel",
    articles: "artikel",
    noSavedArticles: "Belum ada artikel disimpan",
    tapBookmarkHint:
      "Ketik ikon penanda buku pada mana-mana artikel untuk menyimpannya",

    // Article detail
    readSuffix: "bacaan",
    relatedArticles: "Artikel Berkaitan",
    like: "Suka",
    likedAction: "Disukai",
    save: "Simpan",
    savedAction: "Disimpan",
    share: "Kongsi",

    // Search modal
    searchArticlesPlaceholder: "Cari artikel, topik, tag\u2026",
    cancel: "Batal",
    searchByHint: "Cari mengikut tajuk, kategori, atau tag",
    noResultsFor: "Tiada hasil untuk",

    // Founder spotlight
    founderSpotlight: "\uD83D\uDD25 Sorotan Pengasas",
    seeAll: "Lihat Semua",

    // Tabs
    home: "Utama",
    discoverTab: "Terokai",
    savedTab: "Disimpan",

    // Posts suffix
    posts: "siaran",
  },
};

export function getDeviceLanguage(): Language {
  try {
    const locales = getLocales();
    if (locales.length > 0) {
      const code = locales[0].languageCode;
      if (code === "zh") return "zh";
      if (code === "ms") return "ms";
    }
  } catch {}
  return "en";
}

export function t(language: Language): TranslationKeys {
  return translations[language];
}
