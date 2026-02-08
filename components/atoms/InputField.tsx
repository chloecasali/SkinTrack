import { Text, TextInput, View } from "react-native";

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
    <View className="w-full mb-5">
      <Text className="text-sm font-medium text-slate-700 mb-2">{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-200
          px-4
          text-base
          text-slate-900
          bg-white
        "
      />
    </View>
  );
}
