import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import InputField from "@/components/atoms/InputField";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { router, useLocalSearchParams } from "expo-router";
import { APP_AUTH_LOGIN } from "@/constants/app";

export default function PasswordForm() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const { loading, errorMsg, handleLogin } = useLogin();
  const { t } = useTranslation();

  useEffect(() => {
    if (!email) {
      router.replace(APP_AUTH_LOGIN);
    }
  }, [email]);

  return (
    <View className="w-full">
      <InputField
        label={t("auth.fields.passwordLabel")}
        value={password}
        onChangeText={setPassword}
        placeholder={t("auth.fields.passwordPlaceholder")}
        secureTextEntry
      />
      {errorMsg && (
        <Text className="text-sm text-red-500 mb-4">{errorMsg}</Text>
      )}
      <PrimaryButton
        title={
          loading ? t("auth.password.signingIn") : t("auth.password.signIn")
        }
        onPress={() => handleLogin(email, password)}
        disabled={loading}
      />
    </View>
  );
}
