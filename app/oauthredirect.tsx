import { Redirect } from "expo-router";
import { AUTH_PATHS } from "@/constants/paths";

export default function OAuthRedirectScreen() {
  return <Redirect href={AUTH_PATHS.login} />;
}
