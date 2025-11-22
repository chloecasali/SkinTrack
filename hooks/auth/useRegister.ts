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

  // Form state
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Local validation for the form using shared helpers
  const validate = () => {
    if (!firstname.trim()) {
      return "Firstname is required.";
    }
    if (!isEmailValid(email)) {
      return "Please enter a valid email address.";
    }
    return validatePassword(password);
  };

  const register = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);

    // Basic empty check prior to full validation
    if (!firstname || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    // Run full validation
    const validationMsg = validate();
    if (validationMsg) {
      setErrorMsg(validationMsg);
      return;
    }

    try {
      setLoading(true);

      await registerService(firstname.trim(), normalizeEmail(email), password);

      setSuccessMsg("Account created successfully!");
      router.replace(APP_AUTH_LOGIN);
    } catch (e: any) {
      setErrorMsg(getErrorMessage(e, "Unable to register right now."));
    } finally {
      setLoading(false);
    }
  };

  return {
    // values
    firstname,
    email,
    password,
    // setters (with normalization where it makes sense)
    setFirstname: (t: string) => setFirstname(t.trim()),
    setEmail: (t: string) => setEmail(normalizeEmail(t)),
    setPassword,
    // actions
    register,
    loading,
    errorMsg,
    successMsg,
  };
}
