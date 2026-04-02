import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "../global.css";

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import * as SplashScreen from "expo-splash-screen";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase";
import AuthScreen from "@/components/auth/AuthScreen";
import OnboardingScreen from "@/components/onboarding/OnboardingScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const darkMode = useAppStore((s) => s.darkMode);
  const session = useAppStore((s) => s.session);
  const setSession = useAppStore((s) => s.setSession);
  const loadSavedArticles = useAppStore((s) => s.loadSavedArticles);
  const hasSeenOnboarding = useAppStore((s) => s.hasSeenOnboarding);
  const [authLoading, setAuthLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    // Restore existing session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
      .catch((err) => {
        console.error("Failed to get session:", err);
      })
      .finally(() => {
        setAuthLoading(false);
      });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load saved articles from Supabase when user signs in
  useEffect(() => {
    if (session?.user) {
      loadSavedArticles();
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (fontsLoaded && !authLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authLoading]);

  if (!fontsLoaded || authLoading) return null;

  if (!session) {
    return (
      <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
        <AuthScreen />
        <StatusBar style={darkMode ? "light" : "dark"} />
      </ThemeProvider>
    );
  }

  if (!hasSeenOnboarding) {
    return (
      <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
        <OnboardingScreen />
        <StatusBar style="light" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </ThemeProvider>
  );
}
