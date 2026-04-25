import { Pressable, Text } from "react-native";
import { AppThemes, Palette } from "@/constants/theme";

type HomeCheckInOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function HomeCheckInOptionNo({
  label,
  selected,
  onPress,
}: HomeCheckInOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className="h-[54px] flex-1 items-center justify-center rounded-[18px] border"
      style={{
        borderColor: AppThemes.light.borderSoft,
        backgroundColor: Palette.cream,
      }}
    >
      <Text
        className="font-sans-semibold text-[15px]"
        style={{
          color: Palette.charcoal,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
