import { Platform } from "react-native";

export const Palette = {
  wine: "#5B0F2A",
  charcoal: "#14151B",
  warmNude: "#D2B6A4",
  skinBeige: "#E8D8CF",
  cream: "#FAF7F8",
} as const;

export const AppColors = {
  shell: "#F7F2EF",
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
  textOnOverlay: "#FAF7F8",
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
  heroDateText: Palette.warmNude,
  featureCardBorder: "#E9DDD6",
  featureCardBackground: "#F7F2EF",
  featureIconBackground: Palette.warmNude,
  featureIcon: Palette.cream,
  featureEyebrowText: Palette.charcoal,
  featureTitleText: "#5E5961",
  checkInYesBackground: Palette.wine,
  checkInYesBorder: Palette.wine,
  checkInYesText: Palette.cream,
  checkInYesShadow: Palette.wine,
  checkInNoBorder: Palette.skinBeige,
  checkInNoText: Palette.charcoal,
  error: "#DC2626",
  blurTint: "light" as const,
  statusBarStyle: "dark" as const,
  activityIndicator: Palette.wine,
} as const;

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const value = Number.parseInt(fullHex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red},${green},${blue},${alpha})`;
}

export const ProductTypeBaseColors = {
  cleanser: "#4A90E2",
  moisturizer: "#2EC4B6",
  serum: "#F2994A",
  peeling: "#9B5DE5",
  mask: "#EC4899",
  makeupRemover: "#34C759",
  toner: "#8B5E3C",
  acnePatch: "#EF4444",
  eyecream: "#F4C542",
} as const;

export type ProductType = keyof typeof ProductTypeBaseColors;

type ProductTypePalette = {
  surface: string;
  accent: string;
  highlight: string;
};

function buildProductTypePalette(
  surfaceAlpha: number,
  highlightAlpha: number,
): Record<ProductType, ProductTypePalette> {
  return Object.fromEntries(
    (Object.entries(ProductTypeBaseColors) as Array<[ProductType, string]>).map(
      ([productType, accent]) => [
        productType,
        {
          accent,
          surface: hexToRgba(accent, surfaceAlpha),
          highlight: hexToRgba(accent, highlightAlpha),
        },
      ],
    ),
  ) as Record<ProductType, ProductTypePalette>;
}

export const ProductTypeColors = buildProductTypePalette(0.18, 0.1);

export const AccentTones = {
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
} as const;

export type AccentTone = keyof typeof AccentTones;

export const AppShadows = {
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
  featureCard: {
    shadowColor: Palette.warmNude,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 8,
  },
} as const;

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
