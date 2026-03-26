import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { getLocalizedErrorMessage, normalizeEmail } from "@/hooks/default";
import { APP_HOME } from "@/constants/app";
import { login } from "@/services/auth/login";
import { useCompleteAuth } from "@/hooks/auth/useCompleteAuth";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = async (email: string, password: string) => {
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg(t("validation.missingCredentials"));
      return;
    }
    try {
      setLoading(true);
      const token = await login(normalizeEmail(email), password);
      await completeAuth(token);
    } catch (error: any) {
      setErrorMsg(getLocalizedErrorMessage(error, t, "errors.loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleLogin };
}
