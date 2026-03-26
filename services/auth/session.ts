import {
  AUTH_EMPTY_TOKEN_ERROR,
  AUTH_NO_TOKEN_RECEIVED_ERROR,
} from "@/constants/errors";
import { setToken } from "@/services/auth/token";

export type AuthTokenResponse = {
  token?: string | null;
};

export function requireAuthToken(data: AuthTokenResponse | null): string {
  const token = data?.token?.trim();

  if (!token) {
    throw new Error(AUTH_NO_TOKEN_RECEIVED_ERROR);
  }

  return token;
}

export async function persistSessionToken(token: string): Promise<void> {
  const normalizedToken = token.trim();

  if (!normalizedToken) {
    throw new Error(AUTH_EMPTY_TOKEN_ERROR);
  }

  await setToken(normalizedToken);
}
