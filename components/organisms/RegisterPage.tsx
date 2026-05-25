import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import AuthFooterLink from "@/components/molecules/AuthFooterLink";
import RegisterForm from "@/components/molecules/RegisterForm";
import { AUTH_PATHS } from "@/constants/paths";
import AuthScreen from "@/components/layouts/AuthScreen";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthScreen
      title={t("auth.register.title")}
      subtitle={t("auth.register.subtitle")}
      footer={
        <AuthFooterLink
          body={t("auth.register.alreadyHaveAccount")}
          actionLabel={t("auth.register.signIn")}
          onPress={() => router.push(AUTH_PATHS.login)}
        />
      }
    >
      <RegisterForm />
    </AuthScreen>
  );
}
