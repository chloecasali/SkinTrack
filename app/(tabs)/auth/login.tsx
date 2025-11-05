import { View, Text, TouchableOpacity } from "react-native";
import LoginForm from "@/components/molecules/LoginForm";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-3xl font-bold text-blue-500 mb-8">Login</Text>
            <LoginForm />

            {/* Signup Link */}
            <TouchableOpacity className="mt-4" onPress={() => router.push("/")}>
                <Text className="text-blue-500 underline">Create an account</Text>
            </TouchableOpacity>
        </View>
    );
}
