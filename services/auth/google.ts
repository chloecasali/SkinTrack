import {
  AUTH_GOOGLE_ID_TOKEN_MISSING_ERROR,
  AUTH_GOOGLE_LOGIN_FAILED_ERROR,
} from "@/constants/errors";
import { API_PATHS } from "@/constants/paths";
import {
  requireAuthToken,
  type AuthTokenResponse,
} from "@/services/auth/session";
import { apiUrl, ensureOk } from "@/services/default";

export async function loginWithGoogle(idToken: string): Promise<string> {
  const normalizedIdToken = idToken.trim();

  if (!normalizedIdToken) {
    throw new Error(AUTH_GOOGLE_ID_TOKEN_MISSING_ERROR);
  }

  const res = await fetch(apiUrl(API_PATHS.googleAuth), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ idToken: normalizedIdToken }),
  });

  const data = await ensureOk<AuthTokenResponse>(
    res,
    AUTH_GOOGLE_LOGIN_FAILED_ERROR,
  );
  return requireAuthToken(data);
}
