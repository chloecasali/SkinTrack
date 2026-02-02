import { apiUrl, ensureOk } from "@/services/default";
import { APP_AUTH_LOGIN } from "@/constants/app";

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
