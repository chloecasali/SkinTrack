import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/molecules/LoginForm";
import { APP_AUTH_REGISTER } from "@/constants/app";
import GoogleAuth from "@/components/atoms/GoogleAuth";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, errorMsg, handleGoogleAuth, ready } = useGoogleAuth();

  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        {t("auth.login.title")}
      </Text>

      <Text className="text-sm text-gray-500 mb-8">
        {t("auth.login.subtitle")}
      </Text>

      <LoginForm />

      <Text className="mt-6 text-center text-sm text-gray-500">
        Or continue with
      </Text>

      {errorMsg && (
        <Text className="mt-4 text-sm text-red-500">{errorMsg}</Text>
      )}

      <GoogleAuth
        onPress={handleGoogleAuth}
        disabled={!ready || loading}
        loading={loading}
      />
      <TouchableOpacity
        className="mt-6 self-center"
        activeOpacity={0.6}
        onPress={() => {
          router.push(APP_AUTH_REGISTER);
        }}
      >
        <Text className="text-sm text-gray-500">
          {t("auth.login.noAccount")}{" "}
          <Text className="text-slate-900 font-medium">
            {t("auth.login.createOne")}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
