import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeStatCardProps = {
  children: ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function HomeStatCard({
  children,
  className = "",
  style,
}: HomeStatCardProps) {
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className={`flex-1 rounded-[34px] border px-5 py-5 ${className}`.trim()}
      style={[
        shadows.card,
        { borderColor: colors.border, backgroundColor: colors.panel },
        style,
      ]}
    >
      {children}
    </View>
  );
}
