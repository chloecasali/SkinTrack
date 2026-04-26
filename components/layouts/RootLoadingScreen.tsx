import { ActivityIndicator, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RootLoadingScreen() {
  const { colors } = useAppTheme();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.shell }}
    >
      <ActivityIndicator size="large" color={colors.activityIndicator} />
    </View>
  );
}
