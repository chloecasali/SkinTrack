import { useEffect, useState } from "react";
import type { ColorSchemeName } from "react-native";
import { readPreference, writePreference } from "@/services/preferences";

const APP_THEME_MODE_KEY = "APP_THEME_MODE";

export type AppThemeMode = "system" | "light" | "dark";

let themeMode: AppThemeMode | undefined;

const subscribers = new Set<(value: AppThemeMode | undefined) => void>();

function notifySubscribers() {
  subscribers.forEach((callback) => callback(themeMode));
}

function isAppThemeMode(
  value: string | null | undefined,
): value is AppThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

export function resolveAppColorScheme(
  systemScheme: ColorSchemeName | undefined,
  mode: AppThemeMode | undefined,
): "light" | "dark" {
  if (mode === "light" || mode === "dark") {
    return mode;
  }

  return systemScheme === "dark" ? "dark" : "light";
}

export async function initThemeMode(): Promise<void> {
  if (themeMode !== undefined) return;

  const storedMode = await readPreference(APP_THEME_MODE_KEY);
  themeMode = isAppThemeMode(storedMode) ? storedMode : "system";
  notifySubscribers();
}

export async function setAppThemeMode(value: AppThemeMode): Promise<void> {
  themeMode = value;
  notifySubscribers();
  await writePreference(APP_THEME_MODE_KEY, value);
}

export function useAppThemeMode(): AppThemeMode | undefined {
  const [state, setState] = useState(themeMode);

  useEffect(() => {
    subscribers.add(setState);
    setState(themeMode);

    return () => {
      subscribers.delete(setState);
    };
  }, []);

  return state;
}
