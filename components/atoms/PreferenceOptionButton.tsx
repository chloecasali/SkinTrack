import { Pressable, Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type PreferenceOptionButtonProps = {
  active: boolean;
  label: string;
  pressableClassName?: string;
  textClassName: string;
  onPress: () => void;
};

export default function PreferenceOptionButton({
  active,
  label,
  pressableClassName = "px-4",
  textClassName,
  onPress,
}: PreferenceOptionButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 rounded-full border py-4 ${pressableClassName}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.82 : 1,
        borderColor: active ? colors.primary : colors.border,
        backgroundColor: active ? colors.primary : colors.elevated,
      })}
    >
      <Text
        className={`text-center ${textClassName} ${
          active ? "font-sans-semibold" : "font-sans"
        }`}
        style={{
          color: active ? colors.primaryContrast : colors.text,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
