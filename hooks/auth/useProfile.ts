import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchMe, MeResponse } from "@/services/auth/me";
import { extractFirstname, getLocalizedErrorMessage } from "@/hooks/default";
import { useToken } from "@/services/auth/token";

export type { MeResponse };

export function useProfile() {
  const { t } = useTranslation();
  const token = useToken();
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (token === undefined) return;
    if (!token) {
      setErrorMsg(t("errors.notAuthenticated"));
      setFirstname(null);
      setEmail(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setErrorMsg(null);

      try {
        const data = await fetchMe(token);
        setFirstname(extractFirstname(data));
        setEmail(data.email ?? null);
      } catch (error: any) {
        setErrorMsg(
          getLocalizedErrorMessage(error, t, "errors.fetchProfileFailed"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [t, token]);

  return { loading, firstname, email, errorMsg };
}
