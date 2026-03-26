import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { initToken } from "@/services/auth/token";
import { initLanguage } from "@/services/language";
import "@/i18n";
import "@/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    void Promise.allSettled([initToken(), initLanguage()]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const label = index === 0 ? "token" : "language";
          console.error(`Failed to initialize ${label}:`, result.reason);
        }
      });

      if (isMounted) {
        setReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
