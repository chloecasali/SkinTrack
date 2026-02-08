import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import RegisterForm from "@/components/molecules/RegisterForm";
import { APP_AUTH_LOGIN } from "@/constants/app";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        Create an account
      </Text>

      <Text className="text-sm text-gray-500 mb-8">
        Get started in a few seconds
      </Text>

      <RegisterForm />

      <TouchableOpacity
        className="mt-6 self-center"
        activeOpacity={0.6}
        onPress={() => router.push(APP_AUTH_LOGIN)}
      >
        <Text className="text-sm text-gray-500">
          Already have an account?{" "}
          <Text className="text-slate-900 font-medium">Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
