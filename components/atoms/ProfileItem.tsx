import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/hooks/use-app-theme";

type ProfileItemProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
};

export default function ProfileItem({
  icon,
  label,
  onPress,
}: ProfileItemProps) {
  const { colors, shadows } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-[28px] border px-4 py-4"
      style={({ pressed }) => ({
        opacity: pressed ? 0.78 : 1,
        borderColor: colors.border,
        backgroundColor: colors.elevated,
      })}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="h-12 w-12 items-center justify-center rounded-full"
          style={[shadows.card, { backgroundColor: colors.panelSoft }]}
        >
          <Ionicons name={icon} size={18} color={colors.primary} />
        </View>
        <Text
          className="font-sans-medium text-base"
          style={{ color: colors.text }}
        >
          {label}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color={colors.textSubtle}
      />
    </Pressable>
  );
}
