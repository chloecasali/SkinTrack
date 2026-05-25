import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import PasswordForm from "@/components/molecules/PasswordForm";
import AuthScreen from "@/components/layouts/AuthScreen";

export default function PasswordPage() {
  const { t } = useTranslation();
  const { firstname } = useLocalSearchParams<{ firstname?: string }>();
  const title = firstname
    ? t("auth.password.titleWithFirstname", { firstname })
    : t("auth.password.title");

  return (
    <AuthScreen
      showBackButton
      title={title}
      subtitle={t("auth.password.subtitle")}
    >
      <PasswordForm />
    </AuthScreen>
  );
}
