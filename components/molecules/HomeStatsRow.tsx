import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeStatCard from "@/components/atoms/HomeStatCard";
import { useAppTheme } from "@/hooks/use-app-theme";
import {Palette} from "@/constants/theme";

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
  const { colors, accents } = useAppTheme();

  return (
    <View className="flex-row gap-4">
      <HomeStatCard>
        <View className="h-10 w-12 items-center justify-center rounded-full">
          <View
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: Palette.skinBeige }}
          />
          <Ionicons
            name="sparkles-outline"
            size={22}
            color={Palette.charcoal}
          />
        </View>

        <Text
          className="mt-4 font-sans-semibold text-[15px]"
          style={{ color: colors.textMuted }}
        >
          {consistencyLabel}
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

      <HomeStatCard>
        <Text
          className="max-w-[120px] font-sans-semibold text-[15px] leading-6"
          style={{ color: colors.textMuted }}
        >
          {heroProgressLabel}
        </Text>

        <View className="mt-32 flex-row items-center gap-3">
          <Text
            className="font-sans-semibold text-[15px]"
            style={{ color: Palette.wine }}
          >
            {progressPercent}%
          </Text>
          <View
            className="h-3 flex-1 overflow-hidden rounded-full"
            style={{ backgroundColor: colors.panelSoft }}
          >
            <View
              className="h-full rounded-full"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: Palette.wine,
              }}
            />
          </View>
        </View>
      </HomeStatCard>
    </View>
  );
}
