import { Pressable, Text } from "react-native";
import { Palette } from "@/constants/theme";

type HomeCheckInOptionVariant = "yes" | "no";

type HomeCheckInOptionProps = {
  label: string;
  variant: HomeCheckInOptionVariant;
  onPress?: () => void;
};

const optionColors: Record<
  HomeCheckInOptionVariant,
  {
    backgroundColor?: string;
    borderColor: string;
    shadowColor?: string;
    textColor: string;
  }
> = {
  yes: {
    backgroundColor: Palette.wine,
    borderColor: Palette.wine,
    shadowColor: Palette.wine,
    textColor: Palette.cream,
  },
  no: {
    borderColor: Palette.skinBeige,
    textColor: Palette.charcoal,
  },
};

const selectedButtonShadow = {
  shadowColor: Palette.wine,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.16,
  shadowRadius: 18,
  elevation: 5,
} as const;

export default function HomeCheckInOption({
  label,
  variant,
  onPress,
}: HomeCheckInOptionProps) {
  const colors = optionColors[variant];
  const isDisabled = !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className="h-[54px] flex-1 items-center justify-center rounded-[18px] border"
      style={[
        colors.shadowColor ? selectedButtonShadow : undefined,
        {
          borderColor: colors.borderColor,
          backgroundColor: colors.backgroundColor,
        },
      ]}
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
