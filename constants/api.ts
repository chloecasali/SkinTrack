type PublicEnvName =
  | "EXPO_PUBLIC_API_URL"
  | "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"
  | "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID";

function getPublicEnv(name: PublicEnvName): string | undefined {
  const value = (process.env as Record<string, string | undefined>)[
    name
  ]?.trim();
  return value || undefined;
}

function getRequiredPublicEnv(name: PublicEnvName): string {
  const value = getPublicEnv(name);
  if (!value) {
    throw new Error(`Missing required public environment variable: ${name}`);
  }

  return value;
}

export const API_URL = getRequiredPublicEnv("EXPO_PUBLIC_API_URL");
export const GOOGLE_IOS_CLIENT_ID = getPublicEnv(
  "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID",
);
export const GOOGLE_ANDROID_CLIENT_ID = getPublicEnv(
  "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID",
);
