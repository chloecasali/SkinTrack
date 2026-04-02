import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Lora_600SemiBold, Lora_700Bold } from "@expo-google-fonts/lora";
import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from "@expo-google-fonts/source-sans-3";
import { initToken } from "@/services/auth/token";
import { initLanguage } from "@/services/language";
import { initThemeMode } from "@/services/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { AppThemes } from "@/constants/theme";
import "@/i18n";
import "@/global.css";

export default function RootLayout() {
  const { scheme, colors } = useAppTheme();
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Lora_600SemiBold,
    Lora_700Bold,
    SourceSans3_400Regular,
    SourceSans3_500Medium,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
  });

  useEffect(() => {
    let isMounted = true;

    WebBrowser.maybeCompleteAuthSession();

    void Promise.allSettled([
      initToken(),
      initLanguage(),
      initThemeMode(),
    ]).then((results) => {
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const label =
            index === 0 ? "token" : index === 1 ? "language" : "theme";
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

  if (!ready || !fontsLoaded) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: AppThemes[scheme].shell }}
      >
        <ActivityIndicator
          size="large"
          color={AppThemes[scheme].activityIndicator}
        />
      </View>
    );
  }

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={colors.statusBarStyle} />
    </ThemeProvider>
  );
}
