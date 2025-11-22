import { apiUrl, ensureOk } from "@/services/default";

export async function login(email: string, password: string) {
  const res = await fetch(apiUrl("/auth/login"), {
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
