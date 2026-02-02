import { useRouter } from "expo-router";
import { useProfile } from "@/hooks/auth/useProfile";
import { Text, View } from "react-native";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { APP_AUTH_LOGIN } from "@/constants/app";
import { clearToken } from "@/services/auth/token";

export default function HomeScreen() {
  const router = useRouter();
  const { firstname } = useProfile();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6">
        Hello {firstname || "Guest"}!
      </Text>

      <PrimaryButton
        title="Disconnect"
        onPress={() => {
          clearToken();
          router.replace(APP_AUTH_LOGIN);
        }}
      />
    </View>
  );
}
