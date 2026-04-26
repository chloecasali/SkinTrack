import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import { useAppTheme } from "@/hooks/use-app-theme";

type Feature = "search" | "calendar" | "scan";

type ComingSoonPageProps = {
  feature: Feature;
};

export default function ComingSoonPage({ feature }: ComingSoonPageProps) {
  const { t } = useTranslation();
  const { colors } = useAppTheme();

  return (
    <AppScreen
      activeTab={feature}
      contentClassName="flex-1 items-center justify-center"
    >
      <View className="items-center px-6">
        <Text
          className="text-center font-lora text-[34px] leading-10"
          style={{ color: colors.textSubtle }}
        >
          {t("common.comingSoon")}
        </Text>
        <Text
          className="mt-3 text-center font-sans text-base leading-6"
          style={{ color: colors.textMuted }}
        >
          {t("common.comingSoonPatience")}
        </Text>
      </View>
    </AppScreen>
  );
}
