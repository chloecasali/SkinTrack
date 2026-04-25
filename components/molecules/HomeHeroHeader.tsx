import { Text, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Palette } from "@/constants/theme";

type HomeHeroHeaderProps = {
  dateLabel: string;
  greeting: string;
};

export default function HomeHeroHeader({
  dateLabel,
  greeting,
}: HomeHeroHeaderProps) {
  const { colors} = useAppTheme();

  return (
    <View className="mt-4 flex-row items-start justify-between gap-5">
      <View className="flex-1">
        <Text
          className="font-sans-semibold text-[14px] uppercase tracking-[2.8px]"
          style={{ color: Palette.wine }}
        >
          {dateLabel}
        </Text>
        <Text
          className="mt-4 font-lora text-[40px] leading-[54px]"
          style={{ color: colors.text }}
        >
          {greeting}
        </Text>
      </View>
    </View>
  );
}
