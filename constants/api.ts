import { Platform } from "react-native";

if (!process.env.EXPO_PUBLIC_AUTH_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_AUTH_BASE_URL is not set. On Android, falling back to EXPO_PUBLIC_ANDROID_URL; on other platforms, the app will fail to start if no auth base URL is configured.",
  );
}

const rawAuthBaseUrl =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL?.replace(/\/$/, "") ||
  (Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_URL?.replace(/\/$/, "")
    : undefined);

if (!rawAuthBaseUrl) {
  throw new Error(
    "AUTH_BASE_URL is not configured. Set EXPO_PUBLIC_AUTH_BASE_URL" +
      (Platform.OS === "android" ? " or EXPO_PUBLIC_ANDROID_URL" : "") +
      ".",
  );
}

export const AUTH_BASE_URL = rawAuthBaseUrl;
