import {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in both fields.");
            return;
        }
        // Simulate registration success
        Alert.alert("Account created", `Welcome, ${email}!`);
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-3xl font-bold text-blue-500 mb-8">
                Register
            </Text>

            {/* Email Field */}
            <View className="w-full mb-4">
                <Text className="text-gray-700 font-medium mb-2">Email</Text>
                <TextInput
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base"
                    placeholder="example@mail.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Password Field */}
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

            {/* Register Button */}
            <TouchableOpacity
                className="w-full bg-blue-500 rounded-xl py-3 active:bg-blue-600"
                onPress={handleRegister}
            >
                <Text className="text-white text-center text-lg font-semibold">
                    Create Account
                </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity className="mt-4">
                <Text className="text-blue-500 underline">Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}
