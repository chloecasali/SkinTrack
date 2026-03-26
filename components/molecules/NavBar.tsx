import type { ComponentProps } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import NavButton from "@/components/atoms/NavButton";
import { APP_PATHS } from "@/constants/paths";

type NavBarProps = {
  activeTab?: "home" | "search" | "scan" | "calendar" | "profile";
};

type NavHref = (typeof APP_PATHS)[keyof typeof APP_PATHS];

type NavTab = {
  key: NonNullable<NavBarProps["activeTab"]>;
  labelKey: string;
  icon: ComponentProps<typeof NavButton>["icon"];
  href?: NavHref;
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
  },
  {
    key: "scan",
    labelKey: "nav.scan",
    icon: "scan-outline",
  },
  {
    key: "calendar",
    labelKey: "nav.calendar",
    icon: "calendar-outline",
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

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 left-0 right-0
                 flex-row bg-white border-t border-gray-200 pt-2"
    >
      {NAV_TABS.map((tab) => {
        const href = tab.href;

        if (!href) {
          return (
            <NavButton
              key={tab.key}
              label={t(tab.labelKey)}
              icon={tab.icon}
              active={activeTab === tab.key}
              disabled
            />
          );
        }

        return (
          <NavButton
            key={tab.key}
            label={t(tab.labelKey)}
            icon={tab.icon}
            active={activeTab === tab.key}
            onPress={() => {
              router.push(href);
            }}
          />
        );
      })}
    </View>
  );
}
