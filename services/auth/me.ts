import { apiUrl, ensureOk } from "@/services/default";

export type MeResponse = {
  firstname?: string;
  firstName?: string;
  givenName?: string;
  [k: string]: any;
};

export async function fetchMe(token: string): Promise<MeResponse> {
  const res = await fetch(apiUrl("/me"), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json, application/ld+json",
    },
  });

  const data = await ensureOk<MeResponse>(res, "Failed to fetch profile");
  return data || {};
}
