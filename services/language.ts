import { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { getLocales } from "expo-localization";
import i18n, { i18nReady } from "@/i18n";
import {
  AppLanguage,
  isSupportedLanguage,
  normalizeLanguageTag,
} from "@/i18n/resources";

const APP_LANGUAGE_KEY = "APP_LANGUAGE";

let language: AppLanguage | undefined;

const subscribers = new Set<(value: AppLanguage | undefined) => void>();

function notifySubscribers() {
  subscribers.forEach((callback) => callback(language));
}

function getDeviceLanguage(): AppLanguage {
  const locale = getLocales()[0];
  return normalizeLanguageTag(locale?.languageTag ?? locale?.languageCode);
}

async function readStoredLanguage(): Promise<AppLanguage | null> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return null;

    const stored = window.localStorage.getItem(APP_LANGUAGE_KEY);
    return isSupportedLanguage(stored) ? stored : null;
  }

  try {
    const stored = await SecureStore.getItemAsync(APP_LANGUAGE_KEY);
    return isSupportedLanguage(stored) ? stored : null;
  } catch (error) {
    console.error("Failed to read language preference", error);
    return null;
  }
}

async function persistLanguage(value: AppLanguage): Promise<void> {
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(APP_LANGUAGE_KEY, value);
    return;
  }

  try {
    await SecureStore.setItemAsync(APP_LANGUAGE_KEY, value);
  } catch (error) {
    console.error("Failed to persist language preference", error);
  }
}

async function applyLanguage(value: AppLanguage): Promise<void> {
  await i18nReady;

  if (i18n.language !== value) {
    await i18n.changeLanguage(value);
  }

  language = value;
  notifySubscribers();
}

export async function initLanguage(): Promise<void> {
  if (language !== undefined) return;

  const storedLanguage = await readStoredLanguage();
  const nextLanguage = storedLanguage ?? getDeviceLanguage();

  await applyLanguage(nextLanguage);
}

export async function setAppLanguage(value: AppLanguage): Promise<void> {
  await applyLanguage(value);
  await persistLanguage(value);
}

export function useAppLanguage(): AppLanguage | undefined {
  const [state, setState] = useState(language);

  useEffect(() => {
    subscribers.add(setState);
    setState(language);

    return () => {
      subscribers.delete(setState);
    };
  }, []);

  return state;
}
