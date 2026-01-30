import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { clearToken } from "@/lib/auth";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useProfile } from "@/hooks/auth/useProfile";
import { APP_AUTH_LOGIN } from "@/constants/app";

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
