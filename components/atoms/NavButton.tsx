import type { ComponentProps } from "react";
import { Pressable, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  const isDisabled = disabled || !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className="flex-1 items-center justify-center py-2"
      style={({ pressed }) => [
        isDisabled && { opacity: 0.45 },
        pressed && {
          ...(Platform.OS === "ios"
            ? {
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
              }
            : {
                elevation: 6,
              }),
        },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, selected: active }}
    >
      <View className="items-center gap-1">
        <Ionicons
          name={icon}
          size={22}
          color={active ? "#0f172a" : isDisabled ? "#cbd5e1" : "#9ca3af"}
        />
        <Text
          className={`text-xs ${
            active
              ? "text-slate-900 font-medium"
              : isDisabled
                ? "text-slate-300"
                : "text-gray-400"
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
