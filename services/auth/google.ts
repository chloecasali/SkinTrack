import { API_AUTH_GOOGLE } from "@/constants/api";
import { requireAuthToken, type AuthTokenResponse } from "@/services/auth/session";
import { apiUrl, ensureOk } from "@/services/default";

export async function loginWithGoogle(idToken: string): Promise<string> {
  const normalizedIdToken = idToken.trim();

  if (!normalizedIdToken) {
    throw new Error("Missing Google ID token.");
  }

  const res = await fetch(apiUrl(API_AUTH_GOOGLE), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ idToken: normalizedIdToken }),
  });

  const data = await ensureOk<AuthTokenResponse>(res, "Google login failed");
  return requireAuthToken(data);
}
