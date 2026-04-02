import { useState } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useAccount } from "@/hooks/auth/useAccount";
import InputField from "@/components/atoms/InputField";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const { loading, errorMsg, handleAccount } = useAccount();
  const { t } = useTranslation();
  const { colors } = useAppTheme();

  return (
    <View className="w-full">
      <InputField
        label={t("auth.fields.emailLabel")}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        placeholder={t("auth.fields.emailPlaceholder")}
        keyboardType="email-address"
      />
      {errorMsg && (
        <Text
          className="mb-4 font-sans text-sm"
          style={{ color: colors.error }}
        >
          {errorMsg}
        </Text>
      )}
      <PrimaryButton
        title={
          loading ? t("auth.login.findingAccount") : t("auth.login.continue")
        }
        onPress={() => handleAccount(email)}
        disabled={loading}
      />
    </View>
  );
}
