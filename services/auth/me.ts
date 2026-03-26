import { apiUrl, ensureOk } from "@/services/default";
import { PROFILE_FETCH_FAILED_ERROR } from "@/constants/errors";

export type MeResponse = {
  email?: string;
  firstname?: string;
  firstName?: string;
  givenName?: string;
  [k: string]: any;
};

export async function fetchMe(token: string): Promise<MeResponse> {
  const res = await fetch(apiUrl("/me"), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/ld+json",
    },
  });

  const data = await ensureOk<MeResponse>(res, PROFILE_FETCH_FAILED_ERROR);
  return data || {};
}
