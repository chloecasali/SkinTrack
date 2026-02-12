import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

export default function ProfileItem({
  icon,
  label,
  onPress,
}: ProfileItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between
                 px-4 py-4 rounded-xl bg-gray-50"
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <View className="flex-row items-center gap-3">
        {/*<Ionicons name={icon} size={20} color="#64748b" />*/}
        <Text className="text-slate-800 text-sm">{label}</Text>
      </View>

      <Ionicons name="chevron-forward-outline" size={18} color="#cbd5e1" />
    </Pressable>
  );
}
