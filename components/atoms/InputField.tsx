import { Text, TextInput, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

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
  const { colors } = useAppTheme();

  return (
    <View className="mb-5 w-full">
      <Text
        className="mb-2 ml-1 font-sans-medium text-[11px] uppercase tracking-[2px]"
        style={{ color: colors.primary }}
      >
        {label}
      </Text>

      <View
        className="rounded-[28px] border px-4"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.inputBackground,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          selectionColor={colors.primary}
          className="h-14 w-full font-sans text-base"
          style={{ color: colors.text }}
        />
      </View>
    </View>
  );
}
