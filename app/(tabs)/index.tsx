import { Redirect } from "expo-router";

export default function HomeScreen() {
  const isAuthenticated = false;

  return <Redirect href={isAuthenticated ? "/" : "/auth/login"} />;
}
