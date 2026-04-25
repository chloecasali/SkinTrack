import type { ComponentProps } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Palette } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

export type HomeRoutineIcon = ComponentProps<typeof Ionicons>["name"];

type HomeRoutineSectionHeaderProps = {
  icon: HomeRoutineIcon;
  title: string;
  stepCountLabel: string;
};

export default function HomeRoutineSectionHeader({
  icon,
  title,
  stepCountLabel,
}: HomeRoutineSectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-row items-center justify-between gap-4">
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={28} color={Palette.warmNude} />
        <Text
          className="font-lora text-[32px] leading-9"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Text
          className="font-sans-semibold text-[16px]"
          style={{ color: colors.textMuted }}
        >
          {stepCountLabel}
        </Text>
        <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
      </View>
    </View>
  );
}
