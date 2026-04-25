import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import HomeCheckInCard from "@/components/molecules/HomeCheckInCard";
import HomeFeatureCard from "@/components/molecules/HomeFeatureCard";
import HomeHeroHeader from "@/components/molecules/HomeHeroHeader";
import HomeRecommendationsSection from "@/components/molecules/HomeRecommendationsSection";
import HomeRoutineSection, {
  type HomeRoutineSectionData,
} from "@/components/molecules/HomeRoutineSection";
import HomeStatsRow from "@/components/molecules/HomeStatsRow";
import HomeTipModal from "@/components/molecules/HomeTipModal";
import { useProfile } from "@/hooks/auth/useProfile";
import { recommendedProducts, routineSections } from "@/constants/mock-content";
import { readPreference, writePreference } from "@/services/preferences";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppLanguage } from "@/services/language";

const STREAK_COUNT = 12;
const CHALLENGE_PROGRESS = 70;
const HOME_DAILY_TIP_LAST_SEEN = "HOME_DAILY_TIP_LAST_SEEN";

function getLocalDayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLocale(language: string | undefined): string {
  return language === "fr" ? "fr-FR" : "en-US";
}

function formatHomeDate(date: Date, locale: string): string {
  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(date);
  const monthDay = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  }).format(date);

  return `${weekday}, ${monthDay}`.toUpperCase();
}

type RoutineSectionDisplay = {
  key: "morning" | "night";
  title: string;
  icon: HomeRoutineSectionData["icon"];
  iconColor: string;
  stepCountLabel: string;
  items: HomeRoutineSectionData["items"];
};

export default function HomePage() {
  const { firstname } = useProfile();
  const { t } = useTranslation();
  const { accents } = useAppTheme();
  const language = useAppLanguage();
  const [didRoutine, setDidRoutine] = useState<boolean | null>(null);
  const [tipVisible, setTipVisible] = useState(false);

  const greetingName = firstname || t("home.guest");
  const todayKey = getLocalDayKey();
  const locale = useMemo(() => getLocale(language), [language]);
  const homeDate = useMemo(() => formatHomeDate(new Date(), locale), [locale]);
  const [morningRoutine, nightRoutine] = useMemo(
    () => routineSections.map((section) => section.items),
    [],
  );
  const routineSectionsDisplay = useMemo<RoutineSectionDisplay[]>(
    () => [
      {
        key: "morning",
        title: t("home.morningTitle"),
        icon: "sunny-outline",
        iconColor: accents.peach.accent,
        stepCountLabel: t("home.stepsCount", { count: morningRoutine.length }),
        items: morningRoutine.map((item) => ({
          step: item.step,
          title: item.title,
          brandName: item.brandName,
          categoryLabel: t(`home.productTypes.${item.productType}`),
          imageSource: item.imageSource,
          imageFallbackLabel: item.imageFallbackLabel,
          productType: item.productType,
        })),
      },
      {
        key: "night",
        title: t("home.nightTitle"),
        icon: "moon-outline",
        iconColor: accents.mint.accent,
        stepCountLabel: t("home.stepsCount", { count: nightRoutine.length }),
        items: nightRoutine.map((item) => ({
          step: item.step,
          title: item.title,
          brandName: item.brandName,
          categoryLabel: t(`home.productTypes.${item.productType}`),
          imageSource: item.imageSource,
          imageFallbackLabel: item.imageFallbackLabel,
          productType: item.productType,
        })),
      },
    ],
    [
      accents.mint.accent,
      accents.peach.accent,
      morningRoutine,
      nightRoutine,
      t,
    ],
  );

  useEffect(() => {
    let isMounted = true;

    void readPreference(HOME_DAILY_TIP_LAST_SEEN).then((lastSeen) => {
      if (!isMounted) return;
      setTipVisible(lastSeen !== todayKey);
    });

    return () => {
      isMounted = false;
    };
  }, [todayKey]);

  const dismissTip = () => {
    setTipVisible(false);
    void writePreference(HOME_DAILY_TIP_LAST_SEEN, todayKey);
  };

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

      <HomeCheckInCard
        title={t("home.checkInTitle")}
        subtitle={t("home.checkInSubtitle")}
        selectedValue={didRoutine}
        yesLabel={t("home.yes")}
        noLabel={t("home.no")}
        onSelect={setDidRoutine}
      />
      <HomeStatsRow
        consistencyLabel={t("home.consistencyLabel")}
        daysUnit={t("home.daysUnit")}
        streakCount={STREAK_COUNT}
        heroProgressLabel={t("home.heroProgressLabel")}
        progressPercent={CHALLENGE_PROGRESS}
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
