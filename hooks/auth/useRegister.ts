import { useState } from "react";
import { useRouter } from "expo-router";
import { register as registerService } from "@/services/auth/register";
import { APP_AUTH_LOGIN } from "@/constants/app";
import {
  getErrorMessage,
  isEmailValid,
  normalizeEmail,
  validatePassword,
} from "@/hooks/default";

export function useRegister() {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validate = () => {
    const trimmedFirstname = firstname.trim();
    const normalizedEmail = normalizeEmail(email);

    if (!trimmedFirstname) {
      return "Firstname is required.";
    }
    if (!isEmailValid(normalizedEmail)) {
      return "Please enter a valid email address.";
    }
    return validatePassword(password);
  };

  const register = async () => {
    setErrorMsg(null);

    if (!firstname || !email || !password) {
      setErrorMsg("Please fill in all fields.");
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

      router.replace(APP_AUTH_LOGIN);
    } catch (e: any) {
      setErrorMsg(getErrorMessage(e, "Unable to register right now."));
    } finally {
      setLoading(false);
    }
  };

  return {
    firstname,
    email,
    password,
    setFirstname,
    setEmail: (t: string) => setEmail(t.toLowerCase()),
    setPassword,
    register,
    loading,
    errorMsg,
  };
}
