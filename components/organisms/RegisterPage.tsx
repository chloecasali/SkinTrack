import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import RegisterForm from "@/components/molecules/RegisterForm";
import { AUTH_PATHS } from "@/constants/paths";
import AuthScreen from "@/components/layouts/AuthScreen";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors } = useAppTheme();

  return (
    <AuthScreen
      title={t("auth.register.title")}
      subtitle={t("auth.register.subtitle")}
      footer={
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => router.push(AUTH_PATHS.login)}
        >
          <Text
            className="font-sans text-base"
            style={{ color: colors.textMuted }}
          >
            {t("auth.register.alreadyHaveAccount")}{" "}
            <Text
              className="font-sans-semibold"
              style={{ color: colors.primary }}
            >
              {t("auth.register.signIn")}
            </Text>
          </Text>
        </TouchableOpacity>
      }
    >
      <RegisterForm />
    </AuthScreen>
  );
}
