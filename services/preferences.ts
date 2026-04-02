import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function readPreference(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return null;

    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to read preference "${key}"`, error);
      return null;
    }
  }

  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Failed to read preference "${key}"`, error);
    return null;
  }
}

export async function writePreference(
  key: string,
  value: string,
): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Failed to write preference "${key}"`, error);
    }
    return;
  }

  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Failed to write preference "${key}"`, error);
  }
}
