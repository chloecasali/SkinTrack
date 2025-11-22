import { useState } from "react";
import { Text } from "react-native";
import InputField from "../atoms/InputField";
import PrimaryButton from "../atoms/PrimaryButton";
import { useLogin } from "@/hooks/auth/useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, errorMsg, handleLogin } = useLogin();

  return (
    <>
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

      {errorMsg && <Text className="text-red-500 mt-2 mb-2">{errorMsg}</Text>}

      <PrimaryButton
        title={loading ? "Signing in..." : "Sign In"}
        onPress={() => handleLogin(email, password)}
        disabled={loading}
      />
    </>
  );
}
