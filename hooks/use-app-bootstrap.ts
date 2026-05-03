import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";
import { Lora_600SemiBold, Lora_700Bold } from "@expo-google-fonts/lora";
import {
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from "@expo-google-fonts/source-sans-3";
import { initToken } from "@/services/auth/token";
import { initLanguage } from "@/services/language";

const ROOT_FONTS = {
  Lora_600SemiBold,
  Lora_700Bold,
  SourceSans3_400Regular,
  SourceSans3_500Medium,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} as const;

const BOOTSTRAP_TASKS = [
  { label: "token", run: initToken },
  { label: "language", run: initLanguage },
] as const;

export function useAppBootstrap(): boolean {
  const [bootstrapReady, setBootstrapReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts(ROOT_FONTS);

  useEffect(() => {
    let isMounted = true;

    WebBrowser.maybeCompleteAuthSession();

    void Promise.allSettled(BOOTSTRAP_TASKS.map(({ run }) => run())).then(
      (results) => {
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            const task = BOOTSTRAP_TASKS[index];
            console.error(`Failed to initialize ${task.label}:`, result.reason);
          }
        });

        if (isMounted) {
          setBootstrapReady(true);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (fontError) {
      console.error("Failed to load app fonts:", fontError);
    }
  }, [fontError]);

  return bootstrapReady && (fontsLoaded || Boolean(fontError));
}
