import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export type ResolvedAppColorScheme = "light" | "dark";

export const Palette = {
  wine: "#5B0F2A",
  charcoal: "#14151B",
  warmNude: "#D2B6A4",
  skinBeige: "#E8D8CF",
  cream: "#FAF7F8",
} as const;

export const AppThemes = {
  light: {
    shell: "#F7F2EF",
    shellTopWash: "rgba(255,255,255,0.45)",
    panel: "#FFFDFC",
    panelSoft: "#F8F1EC",
    panelMuted: "#F4ECE6",
    panelStrong: "#E8D8CF",
    elevated: "#FFFFFF",
    glass: "rgba(255,255,255,0.72)",
    glassStrong: "rgba(255,255,255,0.90)",
    text: Palette.charcoal,
    textMuted: "#7B706C",
    textSubtle: "#A0918B",
    textOnPrimary: "#FAF7F8",
    textOnDark: "#FAF7F8",
    primary: Palette.wine,
    primaryContrast: "#FAF7F8",
    primarySoft: "#F1E4E8",
    border: "rgba(255,255,255,0.80)",
    borderSoft: "rgba(255,255,255,0.60)",
    borderStrong: "#E9DDD6",
    divider: "#E9DDD6",
    navBackground: "rgba(255,255,255,0.72)",
    navIconBackground: "rgba(255,255,255,0.65)",
    navIconActiveBackground: Palette.charcoal,
    navIconActive: "#FAF7F8",
    navIconInactive: "#5E5552",
    navLabelActive: Palette.charcoal,
    navLabelInactive: "#7B706C",
    inputBackground: "rgba(255,255,255,0.90)",
    inputPlaceholder: "#A0918B",
    overlay: "rgba(20,21,27,0.18)",
    cameraOverlay: "rgba(20,21,27,0.24)",
    scanGlass: "rgba(20,21,27,0.25)",
    scanFrameBorder: "rgba(255,255,255,0.80)",
    scanFrameFill: "rgba(255,255,255,0.05)",
    scanGuide: "rgba(255,255,255,0.35)",
    scanHintBackground: "rgba(255,255,255,0.14)",
    iconSurface: "#F8F1EC",
    iconContrastSurface: Palette.charcoal,
    badgeBackground: "#F8F1EC",
    accentPeach: "rgba(237,210,192,0.55)",
    accentLilac: "rgba(232,224,244,0.45)",
    accentMint: "rgba(220,235,221,0.60)",
    accentSand: "rgba(229,215,204,0.35)",
    error: "#DC2626",
    blurTint: "light" as const,
    statusBarStyle: "dark" as const,
    activityIndicator: Palette.wine,
  },
  dark: {
    shell: "#17141B",
    shellTopWash: "rgba(255,255,255,0.04)",
    panel: "#241F27",
    panelSoft: "#2C2530",
    panelMuted: "#342B38",
    panelStrong: "#433540",
    elevated: "#2C242E",
    glass: "rgba(31,26,34,0.78)",
    glassStrong: "rgba(34,28,38,0.92)",
    text: "#F5EDF1",
    textMuted: "#C8BCC4",
    textSubtle: "#9E9098",
    textOnPrimary: "#1B161B",
    textOnDark: "#FAF7F8",
    primary: "#D4B6C3",
    primaryContrast: "#1B161B",
    primarySoft: "#40303C",
    border: "rgba(103,87,99,0.72)",
    borderSoft: "rgba(103,87,99,0.48)",
    borderStrong: "#473C49",
    divider: "#413541",
    navBackground: "rgba(31,26,34,0.82)",
    navIconBackground: "rgba(77,64,75,0.45)",
    navIconActiveBackground: "#D4B6C3",
    navIconActive: "#1B161B",
    navIconInactive: "#D8CBD3",
    navLabelActive: "#F5EDF1",
    navLabelInactive: "#B7AAB3",
    inputBackground: "#2B2430",
    inputPlaceholder: "#8F8088",
    overlay: "rgba(5,4,8,0.58)",
    cameraOverlay: "rgba(5,4,8,0.40)",
    scanGlass: "rgba(18,15,21,0.52)",
    scanFrameBorder: "rgba(245,237,241,0.82)",
    scanFrameFill: "rgba(255,255,255,0.03)",
    scanGuide: "rgba(245,237,241,0.30)",
    scanHintBackground: "rgba(245,237,241,0.12)",
    iconSurface: "#342B38",
    iconContrastSurface: "#D4B6C3",
    badgeBackground: "#342B38",
    accentPeach: "rgba(127,93,78,0.34)",
    accentLilac: "rgba(119,97,145,0.28)",
    accentMint: "rgba(79,107,89,0.24)",
    accentSand: "rgba(109,93,84,0.22)",
    error: "#F87171",
    blurTint: "dark" as const,
    statusBarStyle: "light" as const,
    activityIndicator: "#D4B6C3",
  },
} as const;

export const AppColors = AppThemes.light;

export const AccentTonePalettes = {
  light: {
    peach: {
      surface: "#F1DDD0",
      accent: "#C88C63",
      highlight: "#FFF8F4",
    },
    lilac: {
      surface: "#EAE2F6",
      accent: "#8770BA",
      highlight: "#FCFAFF",
    },
    mint: {
      surface: "#DEEBDD",
      accent: "#5A8763",
      highlight: "#F8FFF7",
    },
    sand: {
      surface: "#E8D8CF",
      accent: "#9A6F5B",
      highlight: "#FFF9F5",
    },
  },
  dark: {
    peach: {
      surface: "#4A3B37",
      accent: "#F0B694",
      highlight: "#65514A",
    },
    lilac: {
      surface: "#443B4E",
      accent: "#D2C1F6",
      highlight: "#5C5069",
    },
    mint: {
      surface: "#33423C",
      accent: "#A8D4B2",
      highlight: "#4A5F57",
    },
    sand: {
      surface: "#4A413C",
      accent: "#DFC0AB",
      highlight: "#62564F",
    },
  },
} as const;

export type AccentTone = keyof typeof AccentTonePalettes.light;
export const AccentTones = AccentTonePalettes.light;

export const AppShadowPalettes = {
  light: {
    floating: {
      shadowColor: Palette.wine,
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.08,
      shadowRadius: 28,
      elevation: 10,
    },
    card: {
      shadowColor: Palette.wine,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.07,
      shadowRadius: 24,
      elevation: 6,
    },
    glow: {
      shadowColor: "#D7B9A8",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 36,
      elevation: 0,
    },
  },
  dark: {
    floating: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.34,
      shadowRadius: 32,
      elevation: 12,
    },
    card: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.22,
      shadowRadius: 26,
      elevation: 8,
    },
    glow: {
      shadowColor: "#6E5663",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.24,
      shadowRadius: 42,
      elevation: 0,
    },
  },
} as const;

export const AppShadows = AppShadowPalettes.light;

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const AppFonts = {
  title: "Lora_600SemiBold",
  titleBold: "Lora_700Bold",
  body: "SourceSans3_400Regular",
  bodyMedium: "SourceSans3_500Medium",
  bodySemiBold: "SourceSans3_600SemiBold",
  bodyBold: "SourceSans3_700Bold",
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
    title: AppFonts.title,
    titleBold: AppFonts.titleBold,
    body: AppFonts.body,
    bodyMedium: AppFonts.bodyMedium,
    bodySemiBold: AppFonts.bodySemiBold,
    bodyBold: AppFonts.bodyBold,
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
    title: AppFonts.title,
    titleBold: AppFonts.titleBold,
    body: AppFonts.body,
    bodyMedium: AppFonts.bodyMedium,
    bodySemiBold: AppFonts.bodySemiBold,
    bodyBold: AppFonts.bodyBold,
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    title: AppFonts.title,
    titleBold: AppFonts.titleBold,
    body: AppFonts.body,
    bodyMedium: AppFonts.bodyMedium,
    bodySemiBold: AppFonts.bodySemiBold,
    bodyBold: AppFonts.bodyBold,
  },
});
