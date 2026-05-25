import { View } from "react-native";
import { useTranslation } from "react-i18next";
import ProfileItem from "@/components/atoms/ProfileItem";
import SectionHeader from "@/components/atoms/SectionHeader";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function ProfileSupportCard() {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
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
  );
}
