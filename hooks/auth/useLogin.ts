import { useState } from "react";
import { login } from "@/services/auth/login";
import { setToken } from "@/lib/auth";
import { useRouter } from "expo-router";
import { getErrorMessage, isEmailValid, normalizeEmail } from "@/hooks/default";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  // Attempt to log the user in with basic client-side checks
  const handleLogin = async (email: string, password: string) => {
    // reset error
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    // quick email format validation to avoid unnecessary requests
    if (!isEmailValid(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const token = await login(normalizeEmail(email), password);

      setToken(token);
      router.replace("/home");
    } catch (error: any) {
      // API error (invalid credentials OR server error)
      setErrorMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleLogin };
}
