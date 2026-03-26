import { Redirect } from "expo-router";
import { APP_PATHS, AUTH_PATHS } from "@/constants/paths";
import { useToken } from "@/services/auth/token";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const token = useToken();
  if (token === undefined) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Redirect href={token ? APP_PATHS.home : AUTH_PATHS.login} />;
}
