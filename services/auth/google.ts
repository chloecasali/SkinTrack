import { API_PATHS } from "@/constants/paths";
import {
  requireAuthToken,
  type AuthTokenResponse,
} from "@/services/auth/session";
import { apiUrl, ensureOk } from "@/services/default";

export async function loginWithGoogle(idToken: string): Promise<string> {
  const normalizedIdToken = idToken.trim();

  if (!normalizedIdToken) {
    throw new Error("Missing Google ID token.");
  }

  const res = await fetch(apiUrl(API_PATHS.googleAuth), {
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
