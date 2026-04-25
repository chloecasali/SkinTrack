import { Text, View } from "react-native";
import HomeCheckInOption from "@/components/atoms/HomeCheckInOption";
import { useAppTheme } from "@/hooks/use-app-theme";

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
        className="font-lora text-[18px] leading-[28px]"
        style={{ color: colors.text }}
      >
        {title}
      </Text>

      <Text
        className="mt-1 font-sans text-[13px]"
        style={{ color: colors.textSubtle }}
      >
        {subtitle}
      </Text>

      <View className="mt-6 flex-row gap-3">
        <HomeCheckInOption
          label={yesLabel}
          variant="yes"
          selected={selectedValue === true}
          onPress={() => onSelect(true)}
        />
        <HomeCheckInOption
          label={noLabel}
          variant="no"
          selected={selectedValue === false}
          onPress={() => onSelect(false)}
        />
      </View>
    </View>
  );
}
