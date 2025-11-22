import { TouchableOpacity, Text } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className={`w-full bg-blue-500 rounded-xl py-3 active:bg-blue-600 ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-white text-center text-lg font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
