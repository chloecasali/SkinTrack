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
      <HomeStatIconBadge
        iconName="sparkles-outline"
        iconColor={Palette.warmNude}
        backgroundColor={Palette.cream}
      />

      <Text
        className="mt-4 font-sans-semibold text-[15px]"
        style={{ color: colors.textMuted }}
      >
        {label}
      </Text>
      <View className="mt-14 flex-row items-end gap-2">
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
