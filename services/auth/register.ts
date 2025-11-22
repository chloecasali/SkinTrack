import { apiUrl, ensureOk } from "@/services/default";

export async function register(
  firstname: string,
  email: string,
  password: string,
): Promise<void> {
  const res = await fetch(apiUrl("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, email, password }),
  });
  await ensureOk(res, "Registration failed");
}
