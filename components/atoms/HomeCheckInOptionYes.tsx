import { Pressable, Text } from "react-native";
import { Palette } from "@/constants/theme";

type HomeCheckInOptionProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function HomeCheckInOptionYes({
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
        borderColor: Palette.wine,
        backgroundColor: Palette.wine,
      }}
    >
      <Text
        className="font-sans-semibold text-[15px]"
        style={{
          color: Palette.cream,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
