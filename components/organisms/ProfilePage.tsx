import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import AppScreen from "@/components/layouts/AppScreen";
import { AUTH_PATHS } from "@/constants/paths";
import { clearToken } from "@/services/auth/token";
import ProfileItem from "@/components/atoms/ProfileItem";
import DisconnectButton from "@/components/atoms/DisconnectButton";
import SectionHeader from "@/components/atoms/SectionHeader";
import { useProfile } from "@/hooks/auth/useProfile";
import { setAppLanguage, useAppLanguage } from "@/services/language";
import { setAppThemeMode, useAppThemeMode } from "@/services/theme";
import { SUPPORTED_LANGUAGES } from "@/i18n/resources";
import { useAppTheme } from "@/hooks/use-app-theme";

const THEME_MODES = ["system", "light", "dark"] as const;

export default function ProfilePage() {
  const { firstname, email, errorMsg } = useProfile();
  const language = useAppLanguage();
  const themeMode = useAppThemeMode() ?? "system";
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  const handleDisconnect = async () => {
    await clearToken();
    router.replace(AUTH_PATHS.login);
  };

  return (
    <AppScreen activeTab="profile" scroll contentClassName="gap-6">
      <View
        className="overflow-hidden rounded-[40px] border px-5 py-5"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panelSoft },
        ]}
      >
        <View
          className="absolute -right-8 top-0 h-36 w-36 rounded-full"
          style={{ backgroundColor: colors.accentPeach }}
        />
        <View
          className="absolute left-[-20px] bottom-0 h-24 w-24 rounded-full"
          style={{ backgroundColor: colors.accentLilac }}
        />

        <View className="flex-row items-start justify-between gap-4">
          <View className="flex-1">
            <View
              className="self-start rounded-full px-4 py-2"
              style={{ backgroundColor: colors.panelMuted }}
            >
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2.4px]"
                style={{ color: colors.primary }}
              >
                {t("profile.title")}
              </Text>
            </View>

            <Text
              className="mt-5 font-lora text-[38px] leading-[42px]"
              style={{ color: colors.text }}
            >
              {firstname || "SkinTrack"}
            </Text>
            <Text
              className="mt-2 font-sans text-base"
              style={{ color: colors.textMuted }}
            >
              {email || "skintrack@routine.app"}
            </Text>
          </View>

          <View
            className="h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.navIconActiveBackground }}
          >
            <Ionicons
              name="person-outline"
              size={28}
              color={colors.navIconActive}
            />
          </View>
        </View>

        <View className="mt-6 flex-row gap-3">
          <View
            className="flex-1 rounded-[28px] px-4 py-4"
            style={{ backgroundColor: colors.elevated }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("profile.status")}
            </Text>
            <Text
              className="mt-2 font-sans text-sm leading-6"
              style={{ color: colors.textMuted }}
            >
              {t("profile.statusBody")}
            </Text>
          </View>

          <View
            className="flex-1 rounded-[28px] px-4 py-4"
            style={{ backgroundColor: colors.panelMuted }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("profile.skinSummary")}
            </Text>
            <Text
              className="mt-2 font-lora text-[28px] leading-8"
              style={{ color: colors.text }}
            >
              78%
            </Text>
          </View>
        </View>
      </View>

      {errorMsg ? (
        <Text className="font-sans text-sm" style={{ color: colors.error }}>
          {errorMsg}
        </Text>
      ) : null}

      <View
        className="rounded-[34px] border p-5"
        style={[
          shadows.card,
          { borderColor: colors.border, backgroundColor: colors.panel },
        ]}
      >
        <SectionHeader
          eyebrow={t("profile.preferencesEyebrow")}
          title={t("profile.preferencesTitle")}
          description={t("profile.preferencesSubtitle")}
        />

        <View className="gap-4">
          <ProfileItem icon="settings-outline" label={t("profile.settings")} />
          <ProfileItem
            icon="shield-checkmark-outline"
            label={t("profile.privacy")}
          />
        </View>

        <View
          className="mt-6 rounded-[30px] px-4 py-4"
          style={{ backgroundColor: colors.panelSoft }}
        >
          <Text
            className="font-sans-medium text-[11px] uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {t("profile.language.title")}
          </Text>
          <Text
            className="mt-2 font-sans text-sm leading-6"
            style={{ color: colors.textMuted }}
          >
            {t("profile.language.subtitle")}
          </Text>

          <View className="mt-4 flex-row gap-3">
            {SUPPORTED_LANGUAGES.map((option) => {
              const active = language === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => {
                    void setAppLanguage(option);
                  }}
                  className="flex-1 rounded-full border px-4 py-4"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.82 : 1,
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : colors.elevated,
                  })}
                >
                  <Text
                    className={`text-center text-base ${
                      active ? "font-sans-semibold" : "font-sans"
                    }`}
                    style={{
                      color: active ? colors.primaryContrast : colors.text,
                    }}
                  >
                    {t(`common.languages.${option}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          className="mt-4 rounded-[30px] px-4 py-4"
          style={{ backgroundColor: colors.panelMuted }}
        >
          <Text
            className="font-sans-medium text-[11px] uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {t("profile.theme.title")}
          </Text>
          <Text
            className="mt-2 font-sans text-sm leading-6"
            style={{ color: colors.textMuted }}
          >
            {t("profile.theme.subtitle")}
          </Text>

          <View className="mt-4 flex-row gap-2">
            {THEME_MODES.map((mode) => {
              const active = themeMode === mode;

              return (
                <Pressable
                  key={mode}
                  onPress={() => {
                    void setAppThemeMode(mode);
                  }}
                  className="flex-1 rounded-full border px-3 py-4"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.82 : 1,
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : colors.elevated,
                  })}
                >
                  <Text
                    className={`text-center text-sm ${
                      active ? "font-sans-semibold" : "font-sans"
                    }`}
                    style={{
                      color: active ? colors.primaryContrast : colors.text,
                    }}
                  >
                    {t(`profile.theme.options.${mode}`)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View
        className="rounded-[34px] border p-5"
        style={[
          shadows.card,
          { borderColor: colors.border, backgroundColor: colors.panelMuted },
        ]}
      >
        <SectionHeader
          eyebrow={t("profile.supportEyebrow")}
          title={t("profile.supportTitle")}
          description={t("profile.supportSubtitle")}
        />
        <View className="gap-4">
          <ProfileItem icon="help-circle-outline" label={t("profile.help")} />
        </View>
      </View>

      <DisconnectButton
        title={t("profile.disconnect")}
        onPress={() => {
          void handleDisconnect();
        }}
      />
    </AppScreen>
  );
}
