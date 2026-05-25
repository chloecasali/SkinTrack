import { Text, View } from "react-native";
import HomeStatCard from "@/components/atoms/HomeStatCard";
import HomeStatIconBadge from "@/components/atoms/HomeStatIconBadge";
import { Palette } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeStreakStatProps = {
  label: string;
  daysUnit: string;
  streakCount: number;
};

export default function HomeStreakStat({
  label,
  daysUnit,
  streakCount,
}: HomeStreakStatProps) {
  const { colors } = useAppTheme();

  return (
    <HomeStatCard>
      <View className="flex-row items-center gap-3">
        <HomeStatIconBadge
          iconName="sparkles-outline"
          iconColor={Palette.warmNude}
          backgroundColor={Palette.cream}
        />

        <Text
          className="flex-1 font-sans-semibold text-[15px]"
          style={{ color: colors.textMuted }}
        >
          {label}
        </Text>
      </View>

      <View className="mt-8 flex-row items-end gap-2">
        <Text
          className="font-lora text-[40px] leading-[42px]"
          style={{ color: colors.text }}
        >
          {streakCount}
        </Text>
        <Text
          className="pb-1 font-sans-semibold text-[16px]"
          style={{ color: colors.textMuted }}
        >
          {daysUnit}
        </Text>
      </View>
    </HomeStatCard>
  );
}
