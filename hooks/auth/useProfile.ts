import { useEffect, useState } from "react";
import { fetchMe, MeResponse } from "@/services/auth/me";
import { extractFirstname, getErrorMessage } from "@/hooks/default";
import { useToken } from "@/services/auth/token";

export type { MeResponse };

export function useProfile() {
  const token = useToken();
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (token === undefined) return;
    if (!token) {
      setErrorMsg("Not authenticated.");
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
        setEmail(data.email);
      } catch (error: any) {
        setErrorMsg(getErrorMessage(error, "Unable to fetch user profile."));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { loading, firstname, email, errorMsg };
}
