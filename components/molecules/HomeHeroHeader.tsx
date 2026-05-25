import { Text, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeHeroHeaderProps = {
  dateLabel: string;
  greeting: string;
};

export default function HomeHeroHeader({
  dateLabel,
  greeting,
}: HomeHeroHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View className="mt-4 flex-row items-start justify-between gap-5">
      <View className="flex-1">
        <Text
          className="font-sans-bold text-[16px] uppercase tracking-[2.8px]"
          style={{ color: colors.heroDateText }}
        >
          {dateLabel}
        </Text>
        <Text
          className="mt-1 font-lora text-[32px] leading-[44px]"
          style={{ color: colors.text }}
        >
          {greeting}
        </Text>
      </View>
    </View>
  );
}
