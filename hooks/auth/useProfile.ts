import { useEffect, useState } from "react";
import { AUTH_BASE_URL } from "@/constants/api";
import { getToken } from "@/lib/auth";

export type MeResponse = {
  firstname?: string;
  firstName?: string;
  givenName?: string;
  [k: string]: any;
};

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
        const res = await fetch(`${AUTH_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json, application/ld+json",
          },
        });

        const isJson = res.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? ((await res.json()) as MeResponse) : null;

        if (!res.ok) {
          const message =
            data?.message ||
            data?.detail ||
            `Failed to fetch profile (${res.status})`;

          throw new Error(message);
        }

        // Pick the first available name field
        const name =
          data?.firstname ?? data?.firstName ?? data?.givenName ?? null;

        setFirstname(name);
      } catch (error: any) {
        setErrorMsg(error?.message || "Unable to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { loading, firstname, errorMsg };
}
