import { apiUrl, ensureOk } from "@/services/default";
import {
  AUTH_ACCOUNT_NOT_FOUND_ERROR,
  AUTH_FETCH_ACCOUNT_FAILED_ERROR,
  AUTH_LOGIN_FAILED_ERROR,
  AUTH_NO_TOKEN_RECEIVED_ERROR,
} from "@/constants/errors";
import { APP_AUTH_LOGIN } from "@/constants/app";

type HydraCollection = {
  totalItems: number;
};

export async function getAccount(email: string): Promise<void> {
  const res = await fetch(apiUrl(`users?email=${email}`), {
    headers: {
      Accept: "application/ld+json",
    },
  });

  const data = await ensureOk<HydraCollection>(
    res,
    AUTH_FETCH_ACCOUNT_FAILED_ERROR,
  );

  if (!data || data["totalItems"] === 0) {
    throw new Error(AUTH_ACCOUNT_NOT_FOUND_ERROR);
  }
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(apiUrl(APP_AUTH_LOGIN), {
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
