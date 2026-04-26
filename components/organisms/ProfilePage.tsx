import { Text } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import DisconnectButton from "@/components/atoms/DisconnectButton";
import AppScreen from "@/components/layouts/AppScreen";
import ProfileHeroCard from "@/components/molecules/ProfileHeroCard";
import ProfilePreferencesCard from "@/components/molecules/ProfilePreferencesCard";
import ProfileSupportCard from "@/components/molecules/ProfileSupportCard";
import { AUTH_PATHS } from "@/constants/paths";
import { useProfile } from "@/hooks/auth/useProfile";
import { useAppTheme } from "@/hooks/use-app-theme";
import { clearToken } from "@/services/auth/token";
import { useAppLanguage } from "@/services/language";

export default function ProfilePage() {
  const { firstname, email, errorMsg } = useProfile();
  const language = useAppLanguage();
  const { t } = useTranslation();
  const { colors } = useAppTheme();

  const handleDisconnect = async () => {
    await clearToken();
    router.replace(AUTH_PATHS.login);
  };

  return (
    <AppScreen activeTab="profile" scroll contentClassName="gap-6">
      <ProfileHeroCard firstname={firstname} email={email} />

      {errorMsg ? (
        <Text className="font-sans text-sm" style={{ color: colors.error }}>
          {errorMsg}
        </Text>
      ) : null}

      <ProfilePreferencesCard language={language} />

      <ProfileSupportCard />

      <DisconnectButton
        title={t("profile.disconnect")}
        onPress={() => {
          void handleDisconnect();
        }}
      />
    </AppScreen>
  );
}
