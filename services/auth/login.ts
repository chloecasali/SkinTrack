import { API_PATHS } from "@/constants/paths";
import { apiUrl, ensureOk } from "@/services/default";
import {
  AUTH_ACCOUNT_NOT_FOUND_ERROR,
  AUTH_FETCH_ACCOUNT_FAILED_ERROR,
  AUTH_LOGIN_FAILED_ERROR,
  AUTH_NO_TOKEN_RECEIVED_ERROR,
} from "@/constants/errors";

type HydraCollection = {
  totalItems: number;
};

export async function getAccount(email: string): Promise<void> {
  const res = await fetch(
    apiUrl(`${API_PATHS.users}?email=${encodeURIComponent(email)}`),
    {
      headers: {
        Accept: "application/ld+json",
      },
    },
  );

  const data = await ensureOk<HydraCollection>(
    res,
    AUTH_FETCH_ACCOUNT_FAILED_ERROR,
  );

  if (!data || data["totalItems"] === 0) {
    throw new Error(AUTH_ACCOUNT_NOT_FOUND_ERROR);
  }
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(apiUrl(API_PATHS.authLogin), {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await ensureOk<any>(res, AUTH_LOGIN_FAILED_ERROR);

  if (!data?.token) {
    throw new Error(AUTH_NO_TOKEN_RECEIVED_ERROR);
  }

  return data.token;
}
