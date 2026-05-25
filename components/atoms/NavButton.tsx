import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/use-app-theme";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type NavButtonProps = {
  label: string;
  icon: IoniconName;
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
};

export default function NavButton({
  label,
  icon,
  active = false,
  onPress,
  disabled = false,
}: NavButtonProps) {
  const { colors } = useAppTheme();
  const isDisabled = disabled || !onPress;
  const labelColor = active ? colors.navLabelActive : colors.navLabelInactive;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className="flex-1 items-center justify-center"
      style={({ pressed }) => ({
        opacity: isDisabled ? 0.45 : pressed ? 0.78 : 1,
      })}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, selected: active }}
    >
      <View
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{
          backgroundColor: active
            ? colors.navIconActiveBackground
            : colors.navIconBackground,
        }}
      >
        <Ionicons
          name={icon}
          size={19}
          color={
            active
              ? colors.navIconActive
              : isDisabled
                ? colors.textSubtle
                : colors.navIconInactive
          }
        />
      </View>
      <Text
        className={`mt-1.5 text-[11px] ${active ? "font-sans-semibold" : "font-sans-medium"}`}
        style={{ color: labelColor }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
