import { useTranslation } from "react-i18next";
import PasswordForm from "@/components/molecules/PasswordForm";
import AuthScreen from "@/components/layouts/AuthScreen";

export default function PasswordPage() {
  const { t } = useTranslation();

  return (
    <AuthScreen
      title={t("auth.password.title")}
      subtitle={t("auth.password.subtitle")}
    >
      <PasswordForm />
    </AuthScreen>
  );
}
