import {Text, TextInput, View} from "react-native";

interface InputFieldProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric";
}

export default function InputField({
                                       label,
                                       value,
                                       onChangeText,
                                       placeholder,
                                       secureTextEntry,
                                       keyboardType = "default",
                                   }: InputFieldProps) {
    return (
        <View className="w-full mb-4">
            <Text className="text-gray-700 font-medium mb-2">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base"
            />
        </View>
    );
}
