import { Redirect } from "expo-router";
import { APP_PATHS, AUTH_PATHS } from "@/constants/paths";
import { useToken } from "@/services/auth/token";
import { ActivityIndicator, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function Index() {
  const token = useToken();
  const { colors } = useAppTheme();

  if (token === undefined) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.shell }}
      >
        <ActivityIndicator size="large" color={colors.activityIndicator} />
      </View>
    );
  }

  return <Redirect href={token ? APP_PATHS.home : AUTH_PATHS.login} />;
}
