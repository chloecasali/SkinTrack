import { Pressable, Text } from "react-native";

export default function AnswerButton({ label }: { label: string }) {
  return (
    <Pressable
      className="flex-1 py-3 rounded-xl border border-gray-200 items-center"
      style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
    >
      <Text className="text-sm font-medium text-slate-800">{label}</Text>
    </Pressable>
  );
}
