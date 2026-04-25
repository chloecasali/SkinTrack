import { Pressable, Text } from "react-native";
import { Palette } from "@/constants/theme";

type HomeCheckInOptionVariant = "yes" | "no";

type HomeCheckInOptionProps = {
  label: string;
  selected: boolean;
  variant: HomeCheckInOptionVariant;
  onPress: () => void;
};

const optionColors: Record<
  HomeCheckInOptionVariant,
  { backgroundColor?: string; borderColor: string; textColor: string }
> = {
  yes: {
    backgroundColor: Palette.wine,
    borderColor: Palette.wine,
    textColor: Palette.cream,
  },
  no: {
    borderColor: Palette.skinBeige,
    textColor: Palette.charcoal,
  },
};

export default function HomeCheckInOption({
  label,
  selected,
  variant,
  onPress,
}: HomeCheckInOptionProps) {
  const colors = optionColors[variant];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="h-[54px] flex-1 items-center justify-center rounded-[18px] border"
      style={{
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
      }}
    >
      <Text
        className="font-sans-semibold text-[15px]"
        style={{ color: colors.textColor }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
