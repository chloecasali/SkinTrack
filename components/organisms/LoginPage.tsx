import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import LoginForm from "@/components/molecules/LoginForm";
import { APP_AUTH_REGISTER } from "@/constants/app";

export default function LoginPage() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8">Login</Text>
      <LoginForm />

      <TouchableOpacity
        className="mt-4"
        onPress={() => {
          router.push(APP_AUTH_REGISTER);
        }}
      >
        <Text className="text-blue-500 underline">Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
