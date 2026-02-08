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
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      className={`
        w-full h-12 rounded-xl
        items-center justify-center
        ${disabled ? "bg-slate-300" : "bg-slate-900"}
      `}
    >
      <Text
        className={`
          text-base font-medium
          ${disabled ? "text-slate-500" : "text-white"}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
