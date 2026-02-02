import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect } from "react";
import { initToken } from "@/services/auth/token";
import "@/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    void initToken().catch((err) => {
      console.error("Failed to initialize token:", err);
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
