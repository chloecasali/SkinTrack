import { Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

interface DisconnectButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export default function DisconnectButton({
  title,
  onPress,
  disabled,
}: DisconnectButtonProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      className="mt-6 items-center rounded-full border py-4"
      style={{
        borderColor: colors.divider,
        backgroundColor: colors.elevated,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text
        className="font-sans-semibold text-base"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
