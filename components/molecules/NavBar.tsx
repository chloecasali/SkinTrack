import type { ComponentProps } from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import NavButton from "@/components/atoms/NavButton";
import { APP_PATHS } from "@/constants/paths";
import { useAppTheme } from "@/hooks/use-app-theme";

type NavBarProps = {
  activeTab?: "home" | "search" | "scan" | "calendar" | "profile";
};

type NavHref = (typeof APP_PATHS)[keyof typeof APP_PATHS];

type NavTab = {
  key: NonNullable<NavBarProps["activeTab"]>;
  labelKey: string;
  icon: ComponentProps<typeof NavButton>["icon"];
  href: NavHref;
};

const NAV_TABS: NavTab[] = [
  {
    key: "home",
    labelKey: "nav.bathroom",
    icon: "home-outline",
    href: APP_PATHS.home,
  },
  {
    key: "search",
    labelKey: "nav.search",
    icon: "search-outline",
    href: APP_PATHS.search,
  },
  {
    key: "scan",
    labelKey: "nav.scan",
    icon: "scan-outline",
    href: APP_PATHS.scan,
  },
  {
    key: "calendar",
    labelKey: "nav.calendar",
    icon: "calendar-outline",
    href: APP_PATHS.calendar,
  },
  {
    key: "profile",
    labelKey: "nav.profile",
    icon: "person-outline",
    href: APP_PATHS.profile,
  },
];

export default function NavBar({ activeTab }: NavBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View
      style={{
        ...shadows.floating,
        bottom: Math.max(insets.bottom, 14),
        left: 18,
        right: 18,
        borderColor: colors.border,
        backgroundColor: colors.navBackground,
      }}
      className="absolute overflow-hidden rounded-[34px] border"
    >
      <BlurView
        intensity={28}
        tint={colors.blurTint}
        className="absolute inset-0"
      />

      <View className="flex-row items-center gap-1 px-2 pb-2 pt-3">
        {NAV_TABS.map((tab) => (
          <NavButton
            key={tab.key}
            label={t(tab.labelKey)}
            icon={tab.icon}
            active={activeTab === tab.key}
            onPress={() => {
              router.navigate(tab.href);
            }}
          />
        ))}
      </View>
    </View>
  );
}
