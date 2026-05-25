import { StyleSheet, Text, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import HomeCheckInOption from "@/components/atoms/HomeCheckInOption";
import { Palette } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeCheckInCardProps = {
  title: string;
  subtitle: string;
  yesLabel: string;
  noLabel: string;
  onSelect?: (value: boolean) => void;
};

export default function HomeCheckInCard({
  title,
  subtitle,
  yesLabel,
  noLabel,
  onSelect,
}: HomeCheckInCardProps) {
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="rounded-[20px]"
      style={[shadows.floating, { backgroundColor: colors.panel }]}
    >
      <View
        className="overflow-hidden rounded-[20px]"
        style={{ backgroundColor: colors.panel }}
      >
        <Svg
          height="100%"
          width="100%"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        >
          <Defs>
            <RadialGradient
              id="checkInCardGradient"
              cx="100%"
              cy="0%"
              fx="100%"
              fy="0%"
              r="90%"
            >
              <Stop
                offset="0"
                stopColor={Palette.skinBeige}
                stopOpacity={0.5}
              />
              <Stop offset="0.38" stopColor={Palette.cream} stopOpacity={0.5} />
              <Stop offset="1" stopColor={colors.panel} stopOpacity={1} />
            </RadialGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#checkInCardGradient)" />
        </Svg>

        <View className="px-6 py-6">
          <Text
            className="font-lora text-[22px] leading-[28px]"
            style={{ color: colors.text }}
          >
            {title}
          </Text>

          <Text
            className="mt-1 font-sans text-[14px]"
            style={{ color: colors.textMuted }}
          >
            {subtitle}
          </Text>

          <View className="mt-6 flex-row gap-3">
            <HomeCheckInOption
              label={yesLabel}
              variant="yes"
              onPress={onSelect ? () => onSelect(true) : undefined}
            />
            <HomeCheckInOption
              label={noLabel}
              variant="no"
              onPress={onSelect ? () => onSelect(false) : undefined}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
