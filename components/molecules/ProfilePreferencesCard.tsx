import { View } from "react-native";
import { useTranslation } from "react-i18next";
import ProfileItem from "@/components/atoms/ProfileItem";
import SectionHeader from "@/components/atoms/SectionHeader";
import ProfilePreferenceSelector from "@/components/molecules/ProfilePreferenceSelector";
import { SUPPORTED_LANGUAGES } from "@/i18n/resources";
import type { AppLanguage } from "@/i18n/resources";
import { useAppTheme } from "@/hooks/use-app-theme";
import { setAppLanguage } from "@/services/language";

type ProfilePreferencesCardProps = {
  language: AppLanguage | undefined;
};

export default function ProfilePreferencesCard({
  language,
}: ProfilePreferencesCardProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
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

      <View className="mt-6">
        <ProfilePreferenceSelector
          activeValue={language ?? "en"}
          backgroundColor={colors.panelSoft}
          title={t("profile.language.title")}
          subtitle={t("profile.language.subtitle")}
          options={SUPPORTED_LANGUAGES}
          optionClassName="px-4"
          optionsGapClassName="gap-3"
          textClassName="text-base"
          getLabel={(option) => t(`common.languages.${option}`)}
          onSelect={(option) => {
            void setAppLanguage(option);
          }}
        />
      </View>
    </View>
  );
}
