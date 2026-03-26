import { View, Text } from "react-native";

export default function RoutineCard({
  step,
  title,
  brandName,
}: {
  step: string;
  title: string;
  brandName: string;
}) {
  return (
    <View className="w-36 border border-gray-200 rounded-2xl p-3">
      <View className="h-24 rounded-xl bg-gray-100 mb-3" />

      <Text className="text-xs text-gray-400 mb-1">{step}</Text>

      <Text className="text-sm font-medium text-slate-900">{title}</Text>

      <Text className="text-xs text-gray-400 mt-1">{brandName}</Text>
    </View>
  );
}
