import { Redirect } from "expo-router";
import { getToken } from "@/lib/auth";
import { APP_AUTH_LOGIN, APP_HOME } from "@/constants/app";

export default function TabsIndex() {
  const token = getToken();
  const isAuthenticated = !!token;

  return <Redirect href={isAuthenticated ? APP_HOME : APP_AUTH_LOGIN} />;
}
