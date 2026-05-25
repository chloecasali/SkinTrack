import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/hooks/use-app-theme";

type ProfileHeroCardProps = {
  email?: string | null;
  firstname?: string | null;
};

export default function ProfileHeroCard({
  email,
  firstname,
}: ProfileHeroCardProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="overflow-hidden rounded-[40px] border px-5 py-5"
      style={[
        shadows.floating,
        { borderColor: colors.border, backgroundColor: colors.panelSoft },
      ]}
    >
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <View
            className="self-start rounded-full px-4 py-2"
            style={{ backgroundColor: colors.panelMuted }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2.4px]"
              style={{ color: colors.primary }}
            >
              {t("profile.title")}
            </Text>
          </View>

          <Text
            className="mt-5 font-lora text-[38px] leading-[42px]"
            style={{ color: colors.text }}
          >
            {firstname || "SkinTrack"}
          </Text>
          <Text
            className="mt-2 font-sans text-base"
            style={{ color: colors.textMuted }}
          >
            {email || "skintrack@routine.app"}
          </Text>
        </View>

        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.navIconActiveBackground }}
        >
          <Ionicons
            name="person-outline"
            size={28}
            color={colors.navIconActive}
          />
        </View>
      </View>

      <View className="mt-6 flex-row gap-3">
        <View
          className="flex-1 rounded-[28px] px-4 py-4"
          style={{ backgroundColor: colors.elevated }}
        >
          <Text
            className="font-sans-medium text-[11px] uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {t("profile.status")}
          </Text>
          <Text
            className="mt-2 font-sans text-sm leading-6"
            style={{ color: colors.textMuted }}
          >
            {t("profile.statusBody")}
          </Text>
        </View>

        <View
          className="flex-1 rounded-[28px] px-4 py-4"
          style={{ backgroundColor: colors.panelMuted }}
        >
          <Text
            className="font-sans-medium text-[11px] uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {t("profile.skinSummary")}
          </Text>
          <Text
            className="mt-2 font-lora text-[28px] leading-8"
            style={{ color: colors.text }}
          >
            78%
          </Text>
        </View>
      </View>
    </View>
  );
}
