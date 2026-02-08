import { useState } from "react";
import { Text, View } from "react-native";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useAccount } from "@/hooks/auth/useAccount";
import InputField from "@/components/atoms/InputField";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const { loading, errorMsg, handleAccount } = useAccount();
  return (
    <View className="w-full">
      <InputField
        label="Email"
        value={email}
        onChangeText={(t) => setEmail(t.toLowerCase())}
        placeholder="example@mail.com"
        keyboardType="email-address"
      />
      {errorMsg && (
        <Text className="text-sm text-red-500 mb-4">{errorMsg}</Text>
      )}
      <PrimaryButton
        title={loading ? "Finding account..." : "Continue"}
        onPress={() => handleAccount(email)}
        disabled={loading}
      />
    </View>
  );
}
