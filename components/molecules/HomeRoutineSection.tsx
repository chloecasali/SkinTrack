import { ScrollView, View } from "react-native";
import RoutineCard from "@/components/atoms/RoutineCard";
import HomeRoutineSectionHeader, {
  type HomeRoutineIcon,
} from "@/components/molecules/HomeRoutineSectionHeader";
import type { ProductType } from "@/constants/theme";
import type { ProductImageSource } from "@/types/product";

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
  icon: HomeRoutineIcon;
  stepCountLabel: string;
  items: HomeRoutineSectionItem[];
};

type HomeRoutineSectionProps = {
  section: HomeRoutineSectionData;
};

export default function HomeRoutineSection({
  section,
}: HomeRoutineSectionProps) {
  return (
    <View className="gap-4">
      <HomeRoutineSectionHeader
        icon={section.icon}
        title={section.title}
        stepCountLabel={section.stepCountLabel}
      />

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
