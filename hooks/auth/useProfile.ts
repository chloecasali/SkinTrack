import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import { fetchMe, MeResponse } from "@/services/auth/me";
import { extractFirstname, getErrorMessage } from "@/hooks/default";

export type { MeResponse };

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setErrorMsg(null);

      const token = getToken();
      if (!token) {
        setErrorMsg("Not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMe(token);
        setFirstname(extractFirstname(data));
      } catch (error: any) {
        setErrorMsg(getErrorMessage(error, "Unable to fetch user profile."));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { loading, firstname, errorMsg };
}
