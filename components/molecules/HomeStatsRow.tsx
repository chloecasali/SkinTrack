import { View } from "react-native";
import HomeChallengeProgressStat from "@/components/molecules/HomeChallengeProgressStat";
import HomeStreakStat from "@/components/molecules/HomeStreakStat";

type HomeStatsRowProps = {
  consistencyLabel: string;
  daysUnit: string;
  streakCount: number;
  heroProgressLabel: string;
  progressPercent: number;
};

export default function HomeStatsRow({
  consistencyLabel,
  daysUnit,
  streakCount,
  heroProgressLabel,
  progressPercent,
}: HomeStatsRowProps) {
  return (
    <View className="flex-row gap-4">
      <HomeStreakStat
        label={consistencyLabel}
        daysUnit={daysUnit}
        streakCount={streakCount}
      />
      <HomeChallengeProgressStat
        label={heroProgressLabel}
        progressPercent={progressPercent}
      />
    </View>
  );
}
