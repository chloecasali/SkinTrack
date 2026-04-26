import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/hooks/use-app-theme";

const CALENDAR_SHARE_INITIALS = ["A", "M", "S"] as const;

export default function CalendarShareCard() {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="overflow-hidden rounded-[34px] border px-5 py-5"
      style={[
        shadows.card,
        { borderColor: colors.border, backgroundColor: colors.panelMuted },
      ]}
    >
      <Text
        className="font-lora text-[32px] leading-9"
        style={{ color: colors.text }}
      >
        {t("calendar.shareTitle")}
      </Text>
      <Text
        className="mt-3 max-w-[280px] font-sans text-[15px] leading-6"
        style={{ color: colors.textMuted }}
      >
        {t("calendar.shareBody")}
      </Text>

      <View className="mt-5 flex-row items-center justify-between gap-4">
        <View className="flex-row">
          {CALENDAR_SHARE_INITIALS.map((initial, index) => (
            <View
              key={initial}
              className="h-10 w-10 items-center justify-center rounded-full border"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.elevated,
                marginLeft: index === 0 ? 0 : -12,
              }}
            >
              <Text
                className="font-sans-semibold text-sm"
                style={{ color: colors.text }}
              >
                {initial}
              </Text>
            </View>
          ))}
        </View>

        <View
          className="rounded-full px-4 py-3"
          style={{ backgroundColor: colors.primary }}
        >
          <Text
            className="font-sans-semibold text-sm"
            style={{ color: colors.primaryContrast }}
          >
            {t("calendar.explore")}
          </Text>
        </View>
      </View>
    </View>
  );
}
