import { Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type AuthFooterLinkProps = {
  actionLabel: string;
  body: string;
  onPress: () => void;
};

export default function AuthFooterLink({
  actionLabel,
  body,
  onPress,
}: AuthFooterLinkProps) {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Text className="font-sans text-base" style={{ color: colors.textMuted }}>
        {body}{" "}
        <Text className="font-sans-semibold" style={{ color: colors.primary }}>
          {actionLabel}
        </Text>
      </Text>
    </TouchableOpacity>
  );
}
