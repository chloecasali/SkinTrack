import { apiUrl, ensureOk } from "@/services/default";
import { APP_AUTH_LOGIN } from "@/constants/app";

type HydraCollection<T> = {
  totalItems: number;
  member: T[];
};

export async function getAccount(email: string): Promise<void> {
  const res = await fetch(apiUrl(`/users?email=${email}`), {
    headers: {
      Accept: "application/ld+json",
    },
  });

  const data = await ensureOk<HydraCollection<unknown>>(
    res,
    "Failed to fetch account",
  );

  if (!data || data["totalItems"] === 0) {
    throw new Error("Account not found.");
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

  const data = await ensureOk<any>(res, "Login failed");

  if (!data?.token) {
    throw new Error("No token received from server.");
  }

  return data.token;
}
