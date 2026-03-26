import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Platform } from "react-native";
import { APP_IOS_BUNDLE_ID, APP_SCHEME } from "@/constants/app";
import {
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@/constants/api";
import { getErrorMessage } from "@/hooks/default";
import { loginWithGoogle } from "@/services/auth/google";
import { useCompleteAuth } from "@/hooks/auth/useCompleteAuth";

WebBrowser.maybeCompleteAuthSession();

const googleRedirectUri = AuthSession.makeRedirectUri({
  scheme: Platform.OS === "ios" ? APP_IOS_BUNDLE_ID : APP_SCHEME,
  path: "oauthredirect",
  native: `${
    Platform.OS === "ios" ? APP_IOS_BUNDLE_ID : APP_SCHEME
  }:/oauthredirect`,
});

export function useGoogleAuth() {
  const completeAuth = useCompleteAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: googleRedirectUri,
    scopes: ["openid", "profile", "email"],
    selectAccount: true,
  });

  useEffect(() => {
    if (!response) return;

    if (response.type === "error") {
      setErrorMsg(getErrorMessage(response.error, "Google sign-in failed."));
      setLoading(false);
      return;
    }

    if (response.type !== "success") {
      setLoading(false);
      return;
    }

    const idToken = response.params.id_token;

    if (!idToken) {
      setErrorMsg("Google sign-in did not return an ID token.");
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
          setErrorMsg(getErrorMessage(error, "Google login failed."));
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

    if (!request) {
      setErrorMsg("Google sign-in is not ready yet.");
      return;
    }

    setLoading(true);

    try {
      const result = await promptAsync();

      if (result.type === "error") {
        setErrorMsg(getErrorMessage(result.error, "Google sign-in failed."));
        setLoading(false);
        return;
      }

      if (result.type !== "success") {
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error, "Google sign-in failed."));
      setLoading(false);
    }
  };

  return {
    errorMsg,
    handleGoogleAuth,
    loading,
    ready: Boolean(request),
  };
}
