import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const darkMode = useAppStore((s) => s.darkMode);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";
  const inputBg = darkMode ? "#2A2A2A" : "#FFFFFF";
  const inputBorder = darkMode ? "#444" : "#E5E0DA";
  const tabInactiveBg = darkMode ? "#2A2A2A" : "#EDE9E3";

  async function handleAuth() {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email to confirm your account!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      }
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError(null);
    setMessage(null);

    try {
      const redirectTo = makeRedirectUri();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
        return;
      }

      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          redirectTo
        );

        if (result.type === "success" && result.url) {
          const url = new URL(result.url);
          // Tokens can be in hash fragment or query params
          const fragment = url.hash.substring(1);
          const params = new URLSearchParams(fragment || url.search);
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");

          if (accessToken && refreshToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }

    setGoogleLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>S</Text>
          </View>
          <Text style={[styles.brandName, { color: textColor }]}>
            Spark
          </Text>
          <Text style={[styles.tagline, { color: mutedText }]}>
            Ignite your curiosity
          </Text>
        </View>

        {/* Login / Sign Up Toggle */}
        <View style={[styles.tabContainer, { backgroundColor: tabInactiveBg }]}>
          <Pressable
            style={[
              styles.tab,
              !isSignUp && styles.tabActive,
              !isSignUp && { backgroundColor: inputBg },
            ]}
            onPress={() => {
              setIsSignUp(false);
              setError(null);
              setMessage(null);
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: !isSignUp ? textColor : mutedText },
                !isSignUp && styles.tabTextActive,
              ]}
            >
              Log In
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tab,
              isSignUp && styles.tabActive,
              isSignUp && { backgroundColor: inputBg },
            ]}
            onPress={() => {
              setIsSignUp(true);
              setError(null);
              setMessage(null);
            }}
          >
            <Text
              style={[
                styles.tabText,
                { color: isSignUp ? textColor : mutedText },
                isSignUp && styles.tabTextActive,
              ]}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {message && (
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
                color: textColor,
              },
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor={mutedText}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
                color: textColor,
              },
            ]}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={mutedText}
            secureTextEntry
          />

          <Pressable
            style={[styles.primaryButton, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {isSignUp ? "Create Account" : "Log In"}
              </Text>
            )}
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: inputBorder }]} />
            <Text style={[styles.dividerText, { color: mutedText }]}>or</Text>
            <View style={[styles.dividerLine, { backgroundColor: inputBorder }]} />
          </View>

          {/* Google Sign In */}
          <Pressable
            style={[
              styles.googleButton,
              {
                backgroundColor: inputBg,
                borderColor: inputBorder,
              },
              googleLoading && styles.buttonDisabled,
            ]}
            onPress={handleGoogleSignIn}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <ActivityIndicator color={mutedText} />
            ) : (
              <>
                <Text style={styles.googleIcon}>G</Text>
                <Text style={[styles.googleButtonText, { color: textColor }]}>
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 48,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E63329",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#E63329",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontFamily: "DMSans_700Bold",
  },
  brandName: {
    fontSize: 26,
    fontFamily: "DMSans_700Bold",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 11,
  },
  tabActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  tabTextActive: {
    fontFamily: "DMSans_700Bold",
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
  },
  primaryButton: {
    backgroundColor: "#E63329",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#E63329",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 15,
    gap: 10,
  },
  googleIcon: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#4285F4",
  },
  googleButtonText: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    padding: 14,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
  },
  messageBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 12,
    padding: 14,
  },
  messageText: {
    color: "#16A34A",
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
  },
});
