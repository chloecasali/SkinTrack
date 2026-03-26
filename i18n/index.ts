import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/i18n/resources";

const i18n = createInstance();

export const i18nReady = i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
