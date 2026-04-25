import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import HomeCheckInCard from "@/components/molecules/HomeCheckInCard";
import HomeFeatureCard from "@/components/molecules/HomeFeatureCard";
import HomeHeroHeader from "@/components/molecules/HomeHeroHeader";
import HomeRoutineSection from "@/components/molecules/HomeRoutineSection";
import HomeStatsRow from "@/components/molecules/HomeStatsRow";
import HomeTipModal from "@/components/molecules/HomeTipModal";
import { HOME_CHALLENGE_PROGRESS, HOME_STREAK_COUNT } from "@/constants/home";
import { useProfile } from "@/hooks/auth/useProfile";
import { useHomeDailyTip } from "@/hooks/home/useHomeDailyTip";
import { useHomeDateLabel } from "@/hooks/home/useHomeDateLabel";
import { useHomeRoutineSections } from "@/hooks/home/useHomeRoutineSections";

export default function HomePage() {
  const { firstname } = useProfile();
  const { t } = useTranslation();
  const [didRoutine, setDidRoutine] = useState<boolean | null>(null);
  const greetingName = firstname || t("home.guest");
  const homeDate = useHomeDateLabel();
  const routineSectionsDisplay = useHomeRoutineSections();
  const { visible: tipVisible, dismiss: dismissTip } = useHomeDailyTip();

  return (
    <AppScreen activeTab="home" scroll contentClassName="gap-7 pb-4">
      <HomeTipModal
        visible={tipVisible}
        onDismiss={dismissTip}
        eyebrow={t("home.tip.eyebrow")}
        title={t("home.tip.title")}
        body={t("home.tip.body")}
        dismissLabel={t("home.tip.dismiss")}
      />

      <HomeHeroHeader
        dateLabel={homeDate}
        greeting={t("home.greeting", { name: greetingName })}
      />

      <HomeStatsRow
        consistencyLabel={t("home.consistencyLabel")}
        daysUnit={t("home.daysUnit")}
        streakCount={HOME_STREAK_COUNT}
        heroProgressLabel={t("home.heroProgressLabel")}
        progressPercent={HOME_CHALLENGE_PROGRESS}
      />
      <HomeCheckInCard
        title={t("home.checkInTitle")}
        subtitle={t("home.checkInSubtitle")}
        selectedValue={didRoutine}
        yesLabel={t("home.yes")}
        noLabel={t("home.no")}
        onSelect={setDidRoutine}
      />

      <HomeFeatureCard
        eyebrow={t("home.featureEyebrow")}
        title={t("home.featureTitle")}
      />

      {routineSectionsDisplay.map((section) => (
        <HomeRoutineSection key={section.key} section={section} />
      ))}
    </AppScreen>
  );
}
