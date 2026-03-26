import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { AUTH_ACCOUNT_NOT_FOUND_ERROR } from "@/constants/errors";
import {
  getLocalizedErrorMessage,
  isEmailValid,
  normalizeEmail,
} from "@/hooks/default";
import { AUTH_PATHS } from "@/constants/paths";
import { getAccount } from "@/services/auth/login";

export function useAccount() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useTranslation();

  const handleAccount = async (email: string) => {
    setErrorMsg(null);
    if (!email) {
      setErrorMsg(t("validation.enterEmail"));
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isEmailValid(normalizedEmail)) {
      setErrorMsg(t("validation.validEmail"));
      return;
    }

    try {
      setLoading(true);

      await getAccount(normalizedEmail);

      router.replace({
        pathname: AUTH_PATHS.password,
        params: { email: normalizedEmail },
      });
    } catch (error: any) {
      if (
        error instanceof Error &&
        error.message === AUTH_ACCOUNT_NOT_FOUND_ERROR
      ) {
        router.replace(AUTH_PATHS.register);
        return;
      }

      setErrorMsg(
        getLocalizedErrorMessage(error, t, "errors.fetchAccountFailed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleAccount };
}
