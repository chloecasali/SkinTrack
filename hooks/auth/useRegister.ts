import { useState } from "react";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { register as registerService } from "@/services/auth/register";
import { AUTH_PATHS } from "@/constants/paths";
import {
  getLocalizedErrorMessage,
  isEmailValid,
  normalizeEmail,
  validatePassword,
} from "@/hooks/default";

export function useRegister() {
  const router = useRouter();
  const { t } = useTranslation();
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = () => {
    const trimmedFirstname = firstname.trim();
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedFirstname) {
      return t("validation.firstnameRequired");
    }
    if (!isEmailValid(normalizedEmail)) {
      return t("validation.validEmail");
    }
    return validatePassword(password, t);
  };

  const register = async () => {
    setErrorMsg(null);

    if (!firstname || !email || !password) {
      setErrorMsg(t("validation.fillAllFields"));
      return;
    }

    const validationMsg = validate();
    if (validationMsg) {
      setErrorMsg(validationMsg);
      return;
    }

    try {
      setLoading(true);

      await registerService(firstname.trim(), normalizeEmail(email), password);

      router.replace(AUTH_PATHS.login);
    } catch (e: any) {
      setErrorMsg(
        getLocalizedErrorMessage(e, t, "errors.unableToRegisterRightNow"),
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    firstname,
    email,
    password,
    setFirstname,
    setEmail,
    setPassword,
    register,
    loading,
    errorMsg,
  };
}
