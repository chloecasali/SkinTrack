import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, loading, errorMsg, successMsg } = useRegister();

  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-blue-500 mb-8">Register</Text>

      {/* Firstname */}
      <View className="w-full mb-4">
        <Text className="text-gray-700 font-medium mb-2">First name</Text>
        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="John"
          placeholderTextColor="#9ca3af"
          autoCapitalize="words"
          value={firstname}
          onChangeText={setFirstname}
        />
      </View>

      {/* Email */}
      <View className="w-full mb-4">
        <Text className="text-gray-700 font-medium mb-2">Email</Text>
        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="example@mail.com"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => setEmail(t.toLowerCase())}
        />
      </View>

      {/* Password */}
      <View className="w-full mb-6">
        <Text className="text-gray-700 font-medium mb-2">Password</Text>
        <TextInput
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base"
          placeholder="••••••••"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Error / Success message */}
      {errorMsg && <Text className="text-red-500 mb-4">{errorMsg}</Text>}
      {successMsg && <Text className="text-green-600 mb-4">{successMsg}</Text>}

      {/* Register Button */}
      <TouchableOpacity
        className="w-full bg-blue-500 rounded-xl py-3 active:bg-blue-600"
        onPress={() => register(firstname, email, password)}
        disabled={loading}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Creating account..." : "Create Account"}
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push("/(tabs)/auth/login")}
      >
        <Text className="text-blue-500 underline">
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
