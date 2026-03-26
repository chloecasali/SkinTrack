import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { APP_SCHEME } from "@/constants/app";
import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@/constants/api";
import { getLocalizedErrorMessage } from "@/hooks/default";
import { loginWithGoogle } from "@/services/auth/google";
import { useCompleteAuth } from "@/hooks/auth/useCompleteAuth";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID_PLACEHOLDER = "__missing_google_client_id__";

const googleRedirectUri = AuthSession.makeRedirectUri({
  scheme: APP_SCHEME,
  path: "oauthredirect",
});

export function useGoogleAuth() {
  const completeAuth = useCompleteAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const platformGoogleClientId =
    Platform.OS === "ios"
      ? GOOGLE_IOS_CLIENT_ID
      : Platform.OS === "android"
        ? GOOGLE_ANDROID_CLIENT_ID
        : null;
  const googleConfigError =
    Platform.OS === "web"
      ? t("errors.googleMobileOnly")
      : platformGoogleClientId
        ? null
        : t("errors.googleNotConfigured", {
            envVar:
              Platform.OS === "ios"
                ? "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID"
                : "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID",
          });
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    clientId: platformGoogleClientId ?? GOOGLE_CLIENT_ID_PLACEHOLDER,
    redirectUri: googleRedirectUri,
    scopes: ["openid", "profile", "email"],
    selectAccount: true,
  });

  useEffect(() => {
    if (!response) return;

    if (response.type === "error") {
      setErrorMsg(t("errors.googleSignInFailed"));
      setLoading(false);
      return;
    }

    if (response.type !== "success") {
      setLoading(false);
      return;
    }

    const idToken = response.params.id_token;

    if (!idToken) {
      setErrorMsg(t("errors.googleIdTokenMissing"));
      setLoading(false);
      return;
    }

    let isMounted = true;

    const finishGoogleAuth = async () => {
      try {
        const token = await loginWithGoogle(idToken);
        await completeAuth(token);
      } catch (error) {
        if (isMounted) {
          setErrorMsg(
            getLocalizedErrorMessage(error, t, "errors.googleSignInFailed"),
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void finishGoogleAuth();

    return () => {
      isMounted = false;
    };
  }, [completeAuth, response]);

  const handleGoogleAuth = async () => {
    setErrorMsg(null);

    if (googleConfigError) {
      setErrorMsg(googleConfigError);
      return;
    }

    if (!request) {
      setErrorMsg(t("errors.googleNotReady"));
      return;
    }

    setLoading(true);

    try {
      const result = await promptAsync();

      if (result.type === "error") {
        setErrorMsg(t("errors.googleSignInFailed"));
        setLoading(false);
        return;
      }

      if (result.type !== "success") {
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(t("errors.googleSignInFailed"));
      setLoading(false);
    }
  };

  return {
    errorMsg: errorMsg ?? googleConfigError,
    handleGoogleAuth,
    loading,
    ready: Boolean(request) && !googleConfigError,
  };
}
