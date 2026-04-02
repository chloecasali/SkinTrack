import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import type { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import SectionHeader from "@/components/atoms/SectionHeader";
import { useAppTheme } from "@/hooks/use-app-theme";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
type ActiveTab = "search" | "calendar";

type ComingSoonPageProps = {
  activeTab: ActiveTab;
  icon: IoniconName;
  titleKey: string;
  bodyKey: string;
  previewKey: string;
  eyebrowKey: string;
};

export default function ComingSoonPage({
  activeTab,
  icon,
  titleKey,
  bodyKey,
  previewKey,
  eyebrowKey,
}: ComingSoonPageProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <AppScreen activeTab={activeTab} scroll contentClassName="gap-6">
      <SectionHeader
        eyebrow={t(eyebrowKey)}
        title={t(titleKey)}
        description={t(bodyKey)}
      />
      <View
        className="rounded-[32px] border p-6"
        style={[
          shadows.card,
          { borderColor: colors.border, backgroundColor: colors.panel },
        ]}
      >
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.panelSoft }}
        >
          <Ionicons name={icon} size={26} color={colors.primary} />
        </View>

        <Text
          className="mt-6 font-lora text-3xl leading-9"
          style={{ color: colors.text }}
        >
          {t("common.comingSoon")}
        </Text>
        <Text
          className="mt-3 font-sans text-lg leading-7"
          style={{ color: colors.textMuted }}
        >
          {t(bodyKey)}
        </Text>

        <View
          className="mt-6 rounded-[24px] p-4"
          style={{ backgroundColor: colors.panelSoft }}
        >
          <Text
            className="font-sans-medium text-xs uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {t("common.preview")}
          </Text>
          <Text
            className="mt-2 font-sans text-base leading-6"
            style={{ color: colors.textMuted }}
          >
            {t(previewKey)}
          </Text>
        </View>
      </View>
    </AppScreen>
  );
}
