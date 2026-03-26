import { setToken } from "@/services/auth/token";

export type AuthTokenResponse = {
  token?: string | null;
};

export function requireAuthToken(data: AuthTokenResponse | null): string {
  const token = data?.token?.trim();

  if (!token) {
    throw new Error("No token received from server.");
  }

  return token;
}

export async function persistSessionToken(token: string): Promise<void> {
  const normalizedToken = token.trim();

  if (!normalizedToken) {
    throw new Error("Cannot persist an empty auth token.");
  }

  await setToken(normalizedToken);
}
