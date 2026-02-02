import { Platform } from "react-native";

if (!process.env.EXPO_PUBLIC_AUTH_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_AUTH_BASE_URL is not set. Using localhost may fail on physical devices.",
  );
}

export const AUTH_BASE_URL =
  process.env.EXPO_PUBLIC_AUTH_BASE_URL?.replace(/\/$/, "") ||
  (Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_URL
    : process.env.EXPO_PUBLIC_AUTH_BASE_URL);
