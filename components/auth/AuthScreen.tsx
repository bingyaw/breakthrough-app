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
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase";

export default function AuthScreen() {
  const darkMode = useAppStore((s) => s.darkMode);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const bg = darkMode ? "#1A1A1A" : "#F7F4EF";
  const textColor = darkMode ? "#F5F5F5" : "#1A1A1A";
  const mutedText = darkMode ? "#AAA" : "#666";
  const inputBg = darkMode ? "#2A2A2A" : "#FFFFFF";
  const inputBorder = darkMode ? "#444" : "#DDD";

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

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bg }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <Text style={[styles.title, { color: textColor }]}>Breakthrough</Text>
          <Text style={[styles.subtitle, { color: mutedText }]}>
            {isSignUp ? "Create your account" : "Welcome back"}
          </Text>
        </View>

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

          <Text style={[styles.label, { color: mutedText }]}>Email</Text>
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
            placeholder="you@example.com"
            placeholderTextColor={mutedText}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <Text style={[styles.label, { color: mutedText }]}>Password</Text>
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
            placeholder="Your password"
            placeholderTextColor={mutedText}
            secureTextEntry
          />

          <Pressable
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isSignUp ? "Sign Up" : "Log In"}
              </Text>
            )}
          </Pressable>

          <Pressable
            style={styles.switchMode}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
          >
            <Text style={[styles.switchText, { color: mutedText }]}>
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <Text style={{ color: "#E63329", fontFamily: "DMSans_700Bold" }}>
                {isSignUp ? "Log In" : "Sign Up"}
              </Text>
            </Text>
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
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E63329",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "#FFF",
    fontSize: 36,
    fontFamily: "DMSans_700Bold",
  },
  title: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    marginTop: 6,
  },
  form: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
  },
  button: {
    backgroundColor: "#E63329",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
  },
  switchMode: {
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
  },
  messageBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  messageText: {
    color: "#16A34A",
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
  },
});
