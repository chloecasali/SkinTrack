import { Platform } from "react-native";

const authBaseUrl = process.env.EXPO_PUBLIC_AUTH_BASE_URL;
const androidUrl = process.env.EXPO_PUBLIC_ANDROID_URL;

if (!authBaseUrl && !(Platform.OS === "android" && androidUrl)) {
  console.warn(
    "No auth base URL is configured. " +
      "Set EXPO_PUBLIC_AUTH_BASE_URL, " +
      (Platform.OS === "android" ? "or EXPO_PUBLIC_ANDROID_URL " : "") +
      "to avoid app startup errors.",
  );
}

const rawAuthBaseUrl =
  authBaseUrl?.replace(/\/$/, "") ||
  (Platform.OS === "android" ? androidUrl?.replace(/\/$/, "") : undefined);

if (!rawAuthBaseUrl) {
  throw new Error(
    "AUTH_BASE_URL is not configured. Set EXPO_PUBLIC_AUTH_BASE_URL" +
      (Platform.OS === "android" ? " or EXPO_PUBLIC_ANDROID_URL" : "") +
      ".",
  );
}

export const AUTH_BASE_URL = rawAuthBaseUrl;
