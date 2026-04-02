import { Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "solid" | "soft" | "outline";
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = "solid",
}: PrimaryButtonProps) {
  const { colors, shadows } = useAppTheme();
  const isOutline = variant === "outline";
  const isSoft = variant === "soft";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[
        variant === "solid" ? shadows.card : undefined,
        {
          borderColor: isOutline
            ? colors.borderStrong
            : isSoft
              ? colors.border
              : colors.primary,
          backgroundColor: isOutline
            ? "transparent"
            : isSoft
              ? colors.elevated
              : colors.primary,
        },
      ]}
      className={`h-14 w-full items-center justify-center rounded-full border px-6 ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <Text
        className="font-sans-semibold text-base"
        style={{
          color: isOutline
            ? colors.text
            : isSoft
              ? colors.primary
              : colors.primaryContrast,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
