import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useAppTheme } from "@/hooks/use-app-theme";

type ScanPermissionCardProps = {
  title: string;
  detail?: string;
  actionLabel?: string;
  onPress?: () => void;
};

export default function ScanPermissionCard({
  title,
  detail,
  actionLabel,
  onPress,
}: ScanPermissionCardProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <AppScreen activeTab="scan" contentClassName="justify-center">
      <View
        className="rounded-[38px] border p-6"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panelSoft },
        ]}
      >
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.panelMuted }}
        >
          <Ionicons name="scan-outline" size={24} color={colors.primary} />
        </View>

        <Text
          className="mt-6 font-sans-medium text-[11px] uppercase tracking-[2px]"
          style={{ color: colors.primary }}
        >
          {t("nav.scan")}
        </Text>
        <Text
          className="mt-3 font-lora text-[34px] leading-10"
          style={{ color: colors.text }}
        >
          {t("scan.title")}
        </Text>
        <Text
          className="mt-3 font-sans text-base leading-6"
          style={{ color: colors.textMuted }}
        >
          {title}
        </Text>

        {detail ? (
          <Text
            className="mt-4 font-sans text-sm leading-6"
            style={{ color: colors.error }}
          >
            {detail}
          </Text>
        ) : null}

        {actionLabel && onPress ? (
          <View className="mt-6">
            <PrimaryButton title={actionLabel} onPress={onPress} />
          </View>
        ) : null}
      </View>
    </AppScreen>
  );
}
