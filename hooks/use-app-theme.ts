import {
  AccentTonePalettes,
  AppShadowPalettes,
  AppThemes,
  type ResolvedAppColorScheme,
} from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { resolveAppColorScheme, useAppThemeMode } from "@/services/theme";

export function useAppColorScheme(): ResolvedAppColorScheme {
  const systemColorScheme = useColorScheme();
  const themeMode = useAppThemeMode();

  return resolveAppColorScheme(systemColorScheme, themeMode);
}

export function useAppTheme() {
  const scheme = useAppColorScheme();

  return {
    scheme,
    isDark: scheme === "dark",
    colors: AppThemes[scheme],
    accents: AccentTonePalettes[scheme],
    shadows: AppShadowPalettes[scheme],
  };
}
