import { Text } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type AuthErrorTextProps = {
  children: string;
  className?: string;
};

export default function AuthErrorText({
  children,
  className = "mb-4",
}: AuthErrorTextProps) {
  const { colors } = useAppTheme();

  return (
    <Text
      className={`font-sans text-sm ${className}`}
      style={{ color: colors.error }}
    >
      {children}
    </Text>
  );
}
