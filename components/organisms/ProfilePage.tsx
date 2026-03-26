import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import NavBar from "@/components/molecules/NavBar";
import { AUTH_PATHS } from "@/constants/paths";
import { clearToken } from "@/services/auth/token";
import ProfileItem from "@/components/atoms/ProfileItem";
import { router } from "expo-router";
import DisconnectButton from "@/components/atoms/DisconnectButton";
import { useProfile } from "@/hooks/auth/useProfile";
import { setAppLanguage, useAppLanguage } from "@/services/language";
import { SUPPORTED_LANGUAGES } from "@/i18n/resources";

export default function ProfilePage() {
  const { firstname, email } = useProfile();
  const language = useAppLanguage();
  const { t } = useTranslation();

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
          <ProfileItem icon="settings-outline" label={t("profile.settings")} />
          <ProfileItem
            icon="shield-checkmark-outline"
            label={t("profile.privacy")}
          />
          <ProfileItem icon="help-circle-outline" label={t("profile.help")} />
        </View>

        <View className="mt-8">
          <Text className="mb-3 text-sm font-medium text-slate-500">
            {t("profile.language.title")}
          </Text>

          <View className="gap-3">
            {SUPPORTED_LANGUAGES.map((option) => {
              const active = language === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    void setAppLanguage(option);
                  }}
                  className={`flex-row items-center justify-between rounded-xl border px-4 py-4 ${
                    active
                      ? "border-slate-900 bg-slate-50"
                      : "border-gray-200 bg-white"
                  }`}
                  style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
                >
                  <Text
                    className={`text-sm ${
                      active ? "font-medium text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {t(`common.languages.${option}`)}
                  </Text>

                  {active && (
                    <Ionicons name="checkmark" size={18} color="#0f172a" />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <DisconnectButton
          title={t("profile.disconnect")}
          onPress={() => {
            clearToken();
            router.replace(AUTH_PATHS.login);
          }}
        />
      </View>

      <NavBar activeTab="profile" />
    </View>
  );
}
