import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/molecules/LoginForm";
import { AUTH_PATHS } from "@/constants/paths";
import GoogleAuth from "@/components/atoms/GoogleAuth";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import AuthScreen from "@/components/layouts/AuthScreen";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, errorMsg, handleGoogleAuth, ready } = useGoogleAuth();
  const { colors } = useAppTheme();

  return (
    <AuthScreen
      title={t("auth.login.title")}
      subtitle={t("auth.login.subtitle")}
      footer={
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            router.push(AUTH_PATHS.register);
          }}
        >
          <Text
            className="font-sans text-base"
            style={{ color: colors.textMuted }}
          >
            {t("auth.login.noAccount")}{" "}
            <Text
              className="font-sans-semibold"
              style={{ color: colors.primary }}
            >
              {t("auth.login.createOne")}
            </Text>
          </Text>
        </TouchableOpacity>
      }
    >
      <LoginForm />

      <Text
        className="mt-7 text-center font-sans text-sm uppercase tracking-[2px]"
        style={{ color: colors.textSubtle }}
      >
        {t("auth.login.orContinueWith")}
      </Text>

      {errorMsg ? (
        <Text
          className="mt-4 font-sans text-sm"
          style={{ color: colors.error }}
        >
          {errorMsg}
        </Text>
      ) : null}

      <GoogleAuth
        onPress={handleGoogleAuth}
        disabled={!ready || loading}
        loading={loading}
      />
    </AuthScreen>
  );
}
