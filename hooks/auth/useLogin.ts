import { useState } from "react";
import { useRouter } from "expo-router";
import { getErrorMessage, normalizeEmail } from "@/hooks/default";
import { APP_HOME } from "@/constants/app";
import { login } from "@/services/auth/login";
import { setToken } from "@/services/auth/token";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Missing credentials.");
      return;
    }
    try {
      setLoading(true);
      const token = await login(normalizeEmail(email), password);
      await setToken(token);
      router.replace(APP_HOME);
    } catch (error: any) {
      setErrorMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleLogin };
}
