import InputField from "@/components/atoms/InputField";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { Text } from "react-native";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
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
        label="Firstname"
        value={firstname}
        onChangeText={setFirstname}
        placeholder="John"
      />

      <InputField
        label="Email"
        value={email}
        onChangeText={(t) => setEmail(t.toLowerCase())}
        placeholder="example@mail.com"
        keyboardType="email-address"
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      {errorMsg && (
        <Text className="text-sm text-red-500 mt-1 mb-3">{errorMsg}</Text>
      )}

      <PrimaryButton
        title={loading ? "Creating account..." : "Create account"}
        onPress={register}
        disabled={loading}
      />
    </>
  );
}
