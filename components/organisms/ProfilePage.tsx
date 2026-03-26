import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "@/components/molecules/NavBar";
import { APP_AUTH_LOGIN } from "@/constants/app";
import { clearToken } from "@/services/auth/token";
import ProfileItem from "@/components/atoms/ProfileItem";
import { router } from "expo-router";
import DisconnectButton from "@/components/atoms/DisconnectButton";
import { useProfile } from "@/hooks/auth/useProfile";

export default function ProfilePage() {
  const { firstname } = useProfile();
  const { email } = useProfile();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-16">
        <View className="items-center mb-10">
          <View className="h-20 w-20 rounded-full bg-gray-100 items-center justify-center mb-4">
            <Ionicons name="person-outline" size={36} color="#64748b" />
          </View>

          <Text className="text-xl font-semibold text-slate-900">
            {firstname}
          </Text>
          <Text className="text-sm text-gray-400 mt-1">{email}</Text>
        </View>

        <View className="gap-4">
          <ProfileItem icon="settings-outline" label="Settings" />
          <ProfileItem icon="shield-checkmark-outline" label="Privacy" />
          <ProfileItem icon="help-circle-outline" label="Help" />
        </View>

        <DisconnectButton
          title="Disconnect"
          onPress={() => {
            clearToken();
            router.replace(APP_AUTH_LOGIN);
          }}
        />
      </View>

      <NavBar activeTab="profile" />
    </View>
  );
}
