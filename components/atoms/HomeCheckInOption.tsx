import { Pressable, Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeCheckInOptionVariant = "yes" | "no";

type HomeCheckInOptionProps = {
  label: string;
  variant: HomeCheckInOptionVariant;
  onPress?: () => void;
};

export default function HomeCheckInOption({
  label,
  variant,
  onPress,
}: HomeCheckInOptionProps) {
  const { colors } = useAppTheme();
  const isDisabled = !onPress;
  const isYes = variant === "yes";
  const optionShadow = {
    shadowColor: colors.checkInYesShadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  } as const;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className="h-[54px] flex-1 items-center justify-center rounded-[20px] border"
      style={[
        isYes ? optionShadow : undefined,
        {
          borderColor: isYes ? colors.checkInYesBorder : colors.checkInNoBorder,
          backgroundColor: isYes ? colors.checkInYesBackground : undefined,
        },
      ]}
    >
      <Text
        className="font-sans-semibold text-[15px]"
        style={{ color: isYes ? colors.checkInYesText : colors.checkInNoText }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
