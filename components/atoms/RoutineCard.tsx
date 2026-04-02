import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { type AccentTone } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type RoutineCardProps = {
  step: string;
  title: string;
  brandName: string;
  note: string;
  duration?: string;
  tone?: AccentTone;
};

export default function RoutineCard({
  step,
  title,
  brandName,
  note,
  duration,
  tone = "peach",
}: RoutineCardProps) {
  const { accents, colors, shadows } = useAppTheme();
  const toneStyle = accents[tone];

  return (
    <View
      className="mr-4 w-[214px] rounded-[32px] border p-4"
      style={[
        shadows.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.panel,
        },
      ]}
    >
      <View
        className="rounded-[28px] px-4 py-4"
        style={{ backgroundColor: toneStyle.surface }}
      >
        <View className="flex-row items-center justify-between gap-3">
          <View
            className="rounded-full px-3 py-1.5"
            style={{ backgroundColor: toneStyle.highlight }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: toneStyle.accent }}
            >
              {step}
            </Text>
          </View>

          {duration ? (
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.textMuted }}
            >
              {duration}
            </Text>
          ) : null}
        </View>

        <View className="mt-20">
          <Text
            className="font-sans text-sm"
            style={{ color: colors.textMuted }}
          >
            {brandName}
          </Text>
          <Text
            className="mt-2 font-lora text-[28px] leading-8"
            style={{ color: colors.text }}
          >
            {title}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-end justify-between gap-3">
        <View className="flex-1">
          <Text
            className="font-sans text-sm leading-5"
            style={{ color: colors.textMuted }}
          >
            {note}
          </Text>
        </View>

        <View
          className="h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.navIconActiveBackground }}
        >
          <Ionicons
            name="arrow-forward"
            size={16}
            color={colors.navIconActive}
          />
        </View>
      </View>
    </View>
  );
}
