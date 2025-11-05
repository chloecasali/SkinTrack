import { useState } from "react";
import { Alert } from "react-native";
import InputField from "../atoms/InputField";
import PrimaryButton from "../atoms/PrimaryButton";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        Alert.alert("Login successful", `Welcome, ${email}!`);
    };

    return (
        <>
            <InputField
                label="Email"
                value={email}
                onChangeText={setEmail}
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
            <PrimaryButton title="Sign In" onPress={handleLogin} />
        </>
    );
}
