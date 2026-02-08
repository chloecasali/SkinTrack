import { Text, View } from "react-native";
import PasswordForm from "@/components/molecules/PasswordForm";

export default function PasswordPage() {
  return (
    <View className="flex-1 bg-white px-6 pt-24">
      <Text className="text-2xl font-semibold text-slate-900 mb-2">
        We found your account!
      </Text>
      <Text className="text-sm text-gray-500 mb-8">
        Enter your password to continue
      </Text>
      <PasswordForm />
      {/*TODO arrow to the left to get back*/}
    </View>
  );
}
