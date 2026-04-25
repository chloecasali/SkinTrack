import type { ComponentProps } from "react";
import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RoutineCard from "@/components/atoms/RoutineCard";
import type { ProductImageSource } from "@/constants/mock-content";
import type { ProductType } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

export type HomeRoutineSectionItem = {
  step: string;
  title: string;
  brandName: string;
  categoryLabel: string;
  imageSource?: ProductImageSource;
  imageFallbackLabel?: string;
  productType: ProductType;
};

export type HomeRoutineSectionData = {
  key: "morning" | "night";
  title: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  iconColor: string;
  stepCountLabel: string;
  items: HomeRoutineSectionItem[];
};

type HomeRoutineSectionProps = {
  section: HomeRoutineSectionData;
};

export default function HomeRoutineSection({
  section,
}: HomeRoutineSectionProps) {
  const { colors } = useAppTheme();

  return (
    <View className="gap-4">
      <View className="flex-row items-center justify-between gap-4">
        <View className="flex-row items-center gap-3">
          <Ionicons name={section.icon} size={28} color={section.iconColor} />
          <Text
            className="font-lora text-[32px] leading-9"
            style={{ color: colors.text }}
          >
            {section.title}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Text
            className="font-sans-semibold text-[16px]"
            style={{ color: colors.textMuted }}
          >
            {section.stepCountLabel}
          </Text>
          <Ionicons name="chevron-forward" size={22} color={colors.textMuted} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24 }}
      >
        {section.items.map((item) => (
          <RoutineCard
            key={`${section.key}-${item.step}-${item.title}`}
            step={item.step}
            title={item.title}
            brandName={item.brandName}
            categoryLabel={item.categoryLabel}
            imageSource={item.imageSource}
            imageFallbackLabel={item.imageFallbackLabel}
            productType={item.productType}
          />
        ))}
      </ScrollView>
    </View>
  );
}
