import { useState } from "react";
import { useRouter } from "expo-router";
import { getErrorMessage, isEmailValid } from "@/hooks/default";
import { APP_AUTH_PASSWORD, APP_AUTH_REGISTER } from "@/constants/app";
import { getAccount } from "@/services/auth/login";

export function useAccount() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleAccount = async (email: string) => {
    setErrorMsg(null);
    if (!email || !isEmailValid(email)) {
      setErrorMsg("Please enter a valid email.");
      return;
    }

    try {
      setLoading(true);
      await getAccount(email);
      router.replace({
        pathname: APP_AUTH_PASSWORD,
        params: { email },
      });
    } catch (error: any) {
      if (error instanceof Error && error.message === "Account not found.") {
        router.replace(APP_AUTH_REGISTER);
        return;
      }

      setErrorMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, handleAccount };
}
