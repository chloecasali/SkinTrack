import { TouchableOpacity, Text } from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function DisconnectButton({
  title,
  onPress,
  disabled,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      className="mt-10 py-3 rounded-xl border border-gray-200 items-center"
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-red-500 font-medium text-center text-lg">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
