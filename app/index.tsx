import { Redirect } from "expo-router";
import { APP_AUTH_LOGIN, APP_HOME } from "@/constants/app";
import {getToken} from "@/services/auth/token";

export default function TabsIndex() {
  const token = getToken();
  const isAuthenticated = !!token;
  return <Redirect href={isAuthenticated ? APP_HOME : APP_AUTH_LOGIN} />;
}
