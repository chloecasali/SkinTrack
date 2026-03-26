import { Redirect, useLocalSearchParams } from "expo-router";
import { AUTH_PATHS } from "@/constants/paths";

export default function OAuthRedirectScreen() {
  const params = useLocalSearchParams();

  return <Redirect href={{ pathname: AUTH_PATHS.login, params }} />;
}
