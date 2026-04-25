import { Text, View } from "react-native";
import HomeCheckInOptionYes from "@/components/atoms/HomeCheckInOptionYes";
import { useAppTheme } from "@/hooks/use-app-theme";
import HomeCheckInOptionNo from "@/components/atoms/HomeCheckInOptionNo";

type HomeCheckInCardProps = {
  title: string;
  subtitle: string;
  selectedValue: boolean | null;
  yesLabel: string;
  noLabel: string;
  onSelect: (value: boolean) => void;
};

export default function HomeCheckInCard({
  title,
  subtitle,
  selectedValue,
  yesLabel,
  noLabel,
  onSelect,
}: HomeCheckInCardProps) {
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="rounded-[38px] border px-6 py-6"
      style={[
        shadows.floating,
        { borderColor: colors.border, backgroundColor: colors.panel },
      ]}
    >
      <Text
        className="font-lora text-[22px] leading-[28px]"
        style={{ color: colors.text }}
      >
        {title}
      </Text>

      <View className="mt-6 flex-row gap-3">
        <HomeCheckInOptionYes
          label={yesLabel}
          selected={selectedValue === true}
          onPress={() => onSelect(true)}
        />
        <HomeCheckInOptionNo
          label={noLabel}
          selected={selectedValue === false}
          onPress={() => onSelect(false)}
        />
      </View>
    </View>
  );
}
