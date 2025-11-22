import { useState } from "react";
import { AUTH_BASE_URL } from "@/constants/api";
import { useRouter } from "expo-router";

export function useRegister() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const register = async (
    firstname: string,
    email: string,
    password: string,
  ) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!firstname || !email || !password) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${AUTH_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          email: email.toLowerCase(),
          password,
        }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) {
        const message =
          data?.message ||
          data?.error ||
          "Registration failed. Please try again.";
        setErrorMsg(message);
        return;
      }

      setSuccessMsg("Account created successfully!");
      router.replace("/(tabs)/auth/login");
    } catch (e: any) {
      setErrorMsg(e?.message || "Unable to register right now.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    errorMsg,
    successMsg,
  };
}
