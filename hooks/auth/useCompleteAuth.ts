import { useCallback } from "react";
import { useRouter } from "expo-router";
import { APP_HOME } from "@/constants/app";
import { persistSessionToken } from "@/services/auth/session";

export function useCompleteAuth() {
  const router = useRouter();

  return useCallback(
    async (token: string) => {
      await persistSessionToken(token);
      router.replace(APP_HOME);
    },
    [router],
  );
}
