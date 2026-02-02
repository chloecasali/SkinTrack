import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import LoginForm from "@/components/molecules/LoginForm";
import { APP_AUTH_REGISTER } from "@/constants/app";

export default function LoginPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        Welcome
      </Text>

      <Text className="text-sm text-gray-500 mb-8">Sign in to continue</Text>

      <LoginForm />

      <TouchableOpacity
        className="mt-6 self-center"
        activeOpacity={0.6}
        onPress={() => {
          router.push(APP_AUTH_REGISTER);
        }}
      >
        <Text className="text-sm text-gray-500">
          Don’t have an account?{" "}
          <Text className="text-slate-900 font-medium">Create one</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
