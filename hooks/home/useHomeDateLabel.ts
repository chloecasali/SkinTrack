import { useMemo } from "react";
import type { AppLanguage } from "@/i18n/resources";
import { useAppLanguage } from "@/services/language";

export function getHomeLocale(language: AppLanguage | undefined): string {
  return language === "fr" ? "fr-FR" : "en-US";
}

export function formatHomeDate(date: Date, locale: string): string {
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(date);
  const monthDay = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  }).format(date);

  return `${weekday}, ${monthDay}`.toUpperCase();
}

export function useHomeDateLabel(): string {
  const language = useAppLanguage();

  return useMemo(
    () => formatHomeDate(new Date(), getHomeLocale(language)),
    [language],
  );
}
