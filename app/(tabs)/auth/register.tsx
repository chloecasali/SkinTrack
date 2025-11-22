import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import RegisterForm from "@/components/molecules/RegisterForm";
import { APP_AUTH_LOGIN } from "@/constants/app";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8">Register</Text>
      <RegisterForm />

      <TouchableOpacity
        className="mt-4"
        onPress={() => router.push(APP_AUTH_LOGIN)}
      >
        <Text className="text-blue-500 underline">
          Already have an account? Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
