import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import PasswordForm from "@/components/molecules/PasswordForm";

export default function PasswordPage() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        {t("auth.password.title")}
      </Text>
      <Text className="text-sm text-gray-500 mb-8">
        {t("auth.password.subtitle")}
      </Text>
      <PasswordForm />
      {/*TODO arrow to the left to get back*/}
    </View>
  );
}
