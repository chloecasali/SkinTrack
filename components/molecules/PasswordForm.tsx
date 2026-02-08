import { useState } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
import InputField from "@/components/atoms/InputField";
import { Text, View } from "react-native";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useLocalSearchParams } from "expo-router";

export default function PasswordForm() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState("");
  const { loading, errorMsg, handleLogin } = useLogin();

  return (
    <View className="w-full">
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />
      {errorMsg && (
        <Text className="text-sm text-red-500 mb-4">{errorMsg}</Text>
      )}
      <PrimaryButton
        title={loading ? "Signing in..." : "Sign in"}
        onPress={() => handleLogin(email, password)}
        disabled={loading}
      />
    </View>
  );
}
