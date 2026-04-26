import { useRouter } from "expo-router";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
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
        <AuthFooterLink
          body={t("auth.login.noAccount")}
          actionLabel={t("auth.login.createOne")}
          onPress={() => {
            router.push(AUTH_PATHS.register);
          }}
        />
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
