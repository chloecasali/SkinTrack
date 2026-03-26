import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import RegisterForm from "@/components/molecules/RegisterForm";
import { AUTH_PATHS } from "@/constants/paths";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        {t("auth.register.title")}
      </Text>

      <Text className="text-sm text-gray-500 mb-8">
        {t("auth.register.subtitle")}
      </Text>

      <RegisterForm />

      <TouchableOpacity
        className="mt-6 self-center"
        activeOpacity={0.6}
        onPress={() => router.push(AUTH_PATHS.login)}
      >
        <Text className="text-sm text-gray-500">
          {t("auth.register.alreadyHaveAccount")}{" "}
          <Text className="text-slate-900 font-medium">
            {t("auth.register.signIn")}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
