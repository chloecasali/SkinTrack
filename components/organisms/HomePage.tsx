import { useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import RoutineCard from "@/components/atoms/RoutineCard";
import AnswerButton from "@/components/atoms/AnswerButton";
import ProductCard from "@/components/atoms/ProductCard";
import SectionHeader from "@/components/atoms/SectionHeader";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import AppScreen from "@/components/layouts/AppScreen";
import { useProfile } from "@/hooks/auth/useProfile";
import { recommendedProducts, routineSections } from "@/constants/mock-content";
import { readPreference, writePreference } from "@/services/preferences";
import { useAppTheme } from "@/hooks/use-app-theme";

const STREAK_COUNT = 12;
const HOME_DAILY_TIP_LAST_SEEN = "HOME_DAILY_TIP_LAST_SEEN";

function getLocalDayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function HomePage() {
  const { firstname } = useProfile();
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();
  const [didRoutine, setDidRoutine] = useState<boolean | null>(null);
  const [tipVisible, setTipVisible] = useState(false);

  const greetingName = firstname || t("home.guest");
  const todayKey = getLocalDayKey();
  const [morningRoutine, nightRoutine] = useMemo(
    () => routineSections.map((section) => section.items),
    [],
  );
  const spotlightProduct = recommendedProducts[0];

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
    <AppScreen activeTab="home" scroll contentClassName="gap-6">
      <Modal
        visible={tipVisible}
        transparent
        animationType="fade"
        onRequestClose={dismissTip}
      >
        <View
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: colors.overlay }}
        >
          <Pressable className="absolute inset-0" onPress={dismissTip} />

          <View
            className="w-full overflow-hidden rounded-[38px] border px-6 py-8"
            style={{
              ...shadows.floating,
              maxWidth: 330,
              borderColor: colors.border,
              backgroundColor: colors.glassStrong,
            }}
          >
            <View
              className="absolute -right-10 -top-6 h-36 w-36 rounded-full"
              style={{ backgroundColor: colors.accentPeach }}
            />
            <View
              className="absolute bottom-6 left-[-22px] h-24 w-24 rounded-full"
              style={{ backgroundColor: colors.accentLilac }}
            />

            <View
              className="self-start rounded-full px-4 py-2"
              style={{ backgroundColor: colors.panelSoft }}
            >
              <Text
                className="font-sans-medium text-xs uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {t("home.tip.eyebrow")}
              </Text>
            </View>

            <Text
              className="mt-6 max-w-[220px] font-lora text-[36px] leading-10"
              style={{ color: colors.text }}
            >
              {t("home.tip.title")}
            </Text>
            <Text
              className="mt-4 max-w-[250px] font-sans text-base leading-6"
              style={{ color: colors.textMuted }}
            >
              {t("home.tip.body")}
            </Text>

            <View className="mt-8">
              <PrimaryButton
                title={t("home.tip.dismiss")}
                onPress={dismissTip}
                variant="soft"
              />
            </View>
          </View>
        </View>
      </Modal>

      <View
        className="overflow-hidden rounded-[40px] border px-5 py-5"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panel },
        ]}
      >
        <View
          className="absolute -right-8 -top-8 h-40 w-40 rounded-full"
          style={{ backgroundColor: colors.accentPeach }}
        />
        <View
          className="absolute bottom-5 right-8 h-20 w-20 rounded-full"
          style={{ backgroundColor: colors.accentLilac }}
        />

        <View className="flex-row items-start justify-between gap-4">
          <View
            className="self-start rounded-full px-4 py-2"
            style={{ backgroundColor: colors.panelSoft }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2.4px]"
              style={{ color: colors.primary }}
            >
              {t("home.eyebrow")}
            </Text>
          </View>

          <View
            className="h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.navIconActiveBackground }}
          >
            <Ionicons
              name="sparkles-outline"
              size={20}
              color={colors.navIconActive}
            />
          </View>
        </View>

        <Text
          className="mt-6 max-w-[250px] font-lora text-[40px] leading-[44px]"
          style={{ color: colors.text }}
        >
          {t("home.greeting", { name: greetingName })}
        </Text>
        <Text
          className="mt-3 max-w-[280px] font-sans text-base leading-6"
          style={{ color: colors.textMuted }}
        >
          {t("home.heroSubtitle")}
        </Text>

        <View className="mt-6 flex-row gap-3">
          <View
            className="flex-1 rounded-[28px] px-4 py-4"
            style={{ backgroundColor: colors.panelSoft }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("home.consistencyLabel")}
            </Text>
            <Text
              className="mt-2 font-lora text-[28px] leading-8"
              style={{ color: colors.text }}
            >
              {t("home.consistencyValue", { count: STREAK_COUNT })}
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
              {t("home.heroProgressLabel")}
            </Text>
            <Text
              className="mt-2 font-lora text-[28px] leading-8"
              style={{ color: colors.text }}
            >
              70%
            </Text>
            <View
              className="mt-3 h-2 overflow-hidden rounded-full"
              style={{ backgroundColor: colors.glass }}
            >
              <View
                className="h-full w-[70%] rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
            </View>
          </View>
        </View>
      </View>

      <View className="gap-4">
        <View
          className="rounded-[34px] border px-5 py-5"
          style={[
            shadows.card,
            { borderColor: colors.border, backgroundColor: colors.panelSoft },
          ]}
        >
          <SectionHeader
            eyebrow={t("home.checkInEyebrow")}
            title={t("home.checkInTitle")}
            description={t("home.checkInSubtitle")}
          />

          <View className="mt-2 flex-row gap-3">
            <AnswerButton
              label={t("home.yes")}
              subtitle={t("home.checkInYesSubtitle")}
              active={didRoutine === true}
              onPress={() => setDidRoutine(true)}
            />
            <AnswerButton
              label={t("home.no")}
              subtitle={t("home.checkInNoSubtitle")}
              active={didRoutine === false}
              onPress={() => setDidRoutine(false)}
            />
          </View>
        </View>

        <View
          className="overflow-hidden rounded-[34px] border px-5 py-5"
          style={[
            shadows.card,
            { borderColor: colors.border, backgroundColor: colors.panelMuted },
          ]}
        >
          <View
            className="absolute -right-10 top-4 h-32 w-32 rounded-full"
            style={{ backgroundColor: colors.accentMint }}
          />

          <View className="flex-row items-start gap-4">
            <View className="flex-1">
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {t("home.featureEyebrow")}
              </Text>
              <Text
                className="mt-3 font-lora text-[32px] leading-9"
                style={{ color: colors.text }}
              >
                {t("home.featureTitle")}
              </Text>
              <Text
                className="mt-3 font-sans text-[15px] leading-6"
                style={{ color: colors.textMuted }}
              >
                {t("home.featureBody")}
              </Text>
            </View>

            <View
              className="h-28 w-28 overflow-hidden rounded-[28px] px-3 py-3"
              style={{ backgroundColor: colors.accentPeach }}
            >
              <Image
                source={{ uri: spotlightProduct.imageUrl }}
                contentFit="contain"
                transition={150}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>

          <View
            className="mt-4 flex-row items-center justify-between rounded-[26px] px-4 py-4"
            style={{ backgroundColor: colors.elevated }}
          >
            <View className="flex-1">
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {spotlightProduct.category}
              </Text>
              <Text
                className="mt-1 font-sans-semibold text-base"
                style={{ color: colors.text }}
              >
                {spotlightProduct.name}
              </Text>
            </View>

            <View className="w-[112px]">
              <PrimaryButton
                title={t("home.featureAction")}
                onPress={() => setTipVisible(true)}
                variant="soft"
              />
            </View>
          </View>
        </View>
      </View>

      <View>
        <SectionHeader
          eyebrow={t("home.routineEyebrow")}
          title={t("home.morningTitle")}
          actionLabel={t("home.actionToday")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {morningRoutine.map((item) => (
            <RoutineCard
              key={`${item.step}-${item.title}`}
              step={item.step}
              title={item.title}
              brandName={item.brandName}
              note={item.note}
              duration={item.duration}
              tone={item.tone}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <SectionHeader
          eyebrow={t("home.routineEyebrow")}
          title={t("home.nightTitle")}
          actionLabel={t("home.actionTonight")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {nightRoutine.map((item) => (
            <RoutineCard
              key={`${item.step}-${item.title}`}
              step={item.step}
              title={item.title}
              brandName={item.brandName}
              note={item.note}
              duration={item.duration}
              tone={item.tone}
            />
          ))}
        </ScrollView>
      </View>

      <View className="pb-4">
        <SectionHeader
          eyebrow={t("home.recommendationEyebrow")}
          title={t("home.recommendationTitle")}
          actionLabel={t("home.actionForYou")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.name}
              category={product.category}
              name={product.name}
              brand={product.brand}
              highlight={product.highlight}
              imageUrl={product.imageUrl}
              imageFallbackLabel={product.imageFallbackLabel}
              tone={product.tone}
            />
          ))}
        </ScrollView>
      </View>
    </AppScreen>
  );
}
