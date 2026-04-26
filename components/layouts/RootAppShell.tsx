import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RootAppShell() {
  const { colors } = useAppTheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={colors.statusBarStyle} />
    </ThemeProvider>
  );
}
