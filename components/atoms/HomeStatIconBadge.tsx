import type { ComponentProps } from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type HomeStatIconBadgeProps = {
  iconName: ComponentProps<typeof Ionicons>["name"];
  iconColor: string;
  backgroundColor: string;
};

export default function HomeStatIconBadge({
  iconName,
  iconColor,
  backgroundColor,
}: HomeStatIconBadgeProps) {
  return (
    <View className="h-10 w-12 items-center justify-center rounded-full">
      <View
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor }}
      />
      <Ionicons name={iconName} size={22} color={iconColor} />
    </View>
  );
}
