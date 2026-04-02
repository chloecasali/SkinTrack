import InputField from "@/components/atoms/InputField";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/hooks/auth/useRegister";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function RegisterForm() {
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const {
    firstname,
    email,
    password,
    setFirstname,
    setEmail,
    setPassword,
    register,
    loading,
    errorMsg,
  } = useRegister();

  return (
    <>
      <InputField
        label={t("auth.fields.firstnameLabel")}
        value={firstname}
        onChangeText={setFirstname}
        placeholder={t("auth.fields.firstnamePlaceholder")}
      />

      <InputField
        label={t("auth.fields.emailLabel")}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        placeholder={t("auth.fields.emailPlaceholder")}
        keyboardType="email-address"
      />

      <InputField
        label={t("auth.fields.passwordLabel")}
        value={password}
        onChangeText={setPassword}
        placeholder={t("auth.fields.passwordPlaceholder")}
        secureTextEntry
      />

      {errorMsg && (
        <Text
          className="mb-3 mt-1 font-sans text-sm"
          style={{ color: colors.error }}
        >
          {errorMsg}
        </Text>
      )}

      <PrimaryButton
        title={
          loading
            ? t("auth.register.creatingAccount")
            : t("auth.register.createAccount")
        }
        onPress={register}
        disabled={loading}
      />
    </>
  );
}
