import InputField from "@/components/atoms/InputField";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
  const { t } = useTranslation();
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
        onChangeText={(t) => setEmail(t.toLowerCase())}
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
        <Text className="text-sm text-red-500 mt-1 mb-3">{errorMsg}</Text>
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
