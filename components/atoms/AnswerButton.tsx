import { Pressable, Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type AnswerButtonProps = {
  label: string;
  subtitle?: string;
  active?: boolean;
  onPress?: () => void;
};

export default function AnswerButton({
  label,
  subtitle,
  active = false,
  onPress,
}: AnswerButtonProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-[28px] border px-4 py-4"
      style={({ pressed }) => ({
        opacity: pressed ? 0.82 : 1,
        borderColor: active ? colors.primary : colors.border,
        backgroundColor: active ? colors.primary : colors.elevated,
      })}
    >
      <Text
        className="font-sans-semibold text-base"
        style={{ color: active ? colors.primaryContrast : colors.text }}
      >
        {label}
      </Text>
      {subtitle ? (
        <Text
          className="mt-2 font-sans text-sm leading-5"
          style={{
            color: active ? colors.primaryContrast : colors.textMuted,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
}
