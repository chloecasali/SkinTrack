import { Text, View } from "react-native";
import HomeProgressBar from "@/components/atoms/HomeProgressBar";
import HomeStatCard from "@/components/atoms/HomeStatCard";
import { Palette } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeChallengeProgressStatProps = {
  label: string;
  progressPercent: number;
};

function clampProgressPercent(progressPercent: number): number {
  return Math.min(Math.max(progressPercent, 0), 100);
}

export default function HomeChallengeProgressStat({
  label,
  progressPercent,
}: HomeChallengeProgressStatProps) {
  const { colors } = useAppTheme();
  const clampedProgressPercent = clampProgressPercent(progressPercent);

  return (
    <HomeStatCard>
      <Text
        className="max-w-[120px] font-sans-semibold text-[15px] leading-6"
        style={{ color: colors.textMuted }}
      >
        {label}
      </Text>

      <View className="mt-20 flex-row items-center gap-3">
        <Text
          className="font-sans-semibold text-[15px]"
          style={{ color: Palette.warmNude }}
        >
          {clampedProgressPercent}%
        </Text>
        <HomeProgressBar
          progressPercent={clampedProgressPercent}
          trackColor={colors.panelSoft}
          fillColor={Palette.warmNude}
        />
      </View>
    </HomeStatCard>
  );
}
