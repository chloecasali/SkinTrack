import { Pressable, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type NavButtonProps = {
  label: string;
  icon: string;
  active?: boolean;
  onPress: () => void;
};

export default function NavButton({
  label,
  icon,
  active = false,
  onPress,
}: NavButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center py-2"
      style={({ pressed }) => [
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
    >
      <View className="items-center gap-1">
        <Ionicons
          name={icon}
          size={22}
          color={active ? "#0f172a" : "#9ca3af"}
        />
        <Text
          className={`text-xs ${
            active ? "text-slate-900 font-medium" : "text-gray-400"
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
