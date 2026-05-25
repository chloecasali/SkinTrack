import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { HomeRoutineSectionData } from "@/components/molecules/HomeRoutineSection";
import { routineSections } from "@/constants/mock-content";

const HOME_ROUTINE_SECTION_META = [
  {
    key: "morning",
    titleKey: "home.morningTitle",
    icon: "sunny-outline",
  },
  {
    key: "night",
    titleKey: "home.nightTitle",
    icon: "moon-outline",
  },
] as const;

export function useHomeRoutineSections(): HomeRoutineSectionData[] {
  const { t } = useTranslation();

  return useMemo(() => {
    const routinesByKey = new Map(
      routineSections.map((section) => [section.key, section.items]),
    );

    return HOME_ROUTINE_SECTION_META.map((section) => {
      const routineItems = routinesByKey.get(section.key) ?? [];

      return {
        key: section.key,
        title: t(section.titleKey),
        icon: section.icon,
        stepCountLabel: t("home.stepsCount", { count: routineItems.length }),
        items: routineItems.map((item) => ({
          step: item.step,
          title: item.title,
          brandName: item.brandName,
          categoryLabel: t(`home.productTypes.${item.productType}`),
          imageSource: item.imageSource,
          imageFallbackLabel: item.imageFallbackLabel,
          productType: item.productType,
        })),
      };
    });
  }, [t]);
}
