import { useState } from "react";
import { login } from "@/services/auth";
import { setToken } from "@/lib/auth";
import { useRouter } from "expo-router";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    // reset error
    setErrorMsg(null);

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const token = await login(email.toLowerCase(), password);

      setToken(token);
      router.replace("/home");
    } catch (error: any) {
      // API error (invalid credentials OR server error)
      setErrorMsg(error.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleLogin };
}
