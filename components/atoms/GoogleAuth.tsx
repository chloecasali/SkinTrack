import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { TouchableOpacity, Image } from "react-native";
import { IOS_CLIENT_ID } from "@/constants/api";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("Google ID Token:", id_token);
    }
  }, [response]);

  return (
    <TouchableOpacity
      onPress={() => promptAsync()}
      disabled={!request}
      activeOpacity={0.8}
    >
      <Image
        source={require("../../assets/images/google/ios_neutral_sq_na.png")}
      />
    </TouchableOpacity>
  );
}
