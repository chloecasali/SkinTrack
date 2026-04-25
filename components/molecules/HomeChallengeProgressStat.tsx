import { Text, View } from "react-native";
import HomeProgressBar from "@/components/atoms/HomeProgressBar";
import HomeStatCard from "@/components/atoms/HomeStatCard";
import { Palette } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeChallengeProgressStatProps = {
  label: string;
  progressPercent: number;
};

export default function HomeChallengeProgressStat({
  label,
  progressPercent,
}: HomeChallengeProgressStatProps) {
  const { colors } = useAppTheme();

  return (
    <HomeStatCard>
      <Text
        className="max-w-[120px] font-sans-semibold text-[15px] leading-6"
        style={{ color: colors.textMuted }}
      >
        {label}
      </Text>

      <View className="mt-32 flex-row items-center gap-3">
        <Text
          className="font-sans-semibold text-[15px]"
          style={{ color: Palette.warmNude }}
        >
          {progressPercent}%
        </Text>
        <HomeProgressBar
          progressPercent={progressPercent}
          trackColor={colors.panelSoft}
          fillColor={Palette.warmNude}
        />
      </View>
    </HomeStatCard>
  );
}
