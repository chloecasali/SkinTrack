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
        onChangeText={setEmail}
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

      {errorMsg && <Text className="text-red-500 mt-2 mb-2">{errorMsg}</Text>}

      <PrimaryButton
        title={loading ? "Creating account..." : "Create Account"}
        onPress={register}
        disabled={loading}
      />
    </>
  );
}
