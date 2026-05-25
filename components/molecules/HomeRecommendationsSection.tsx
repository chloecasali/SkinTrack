import { Text, View } from "react-native";
import ProductCard from "@/components/atoms/ProductCard";
import type { RecommendedProduct } from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeRecommendationsSectionProps = {
  title: string;
  actionLabel: string;
  products: RecommendedProduct[];
};

export default function HomeRecommendationsSection({
  title,
  actionLabel,
  products,
}: HomeRecommendationsSectionProps) {
  const { colors } = useAppTheme();

  return (
    <View className="gap-5 pb-4">
      <View className="flex-row items-center justify-between gap-4">
        <Text
          className="font-lora text-[34px] leading-10"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
        <Text
          className="font-sans-semibold text-[17px]"
          style={{ color: colors.textMuted }}
        >
          {actionLabel}
        </Text>
      </View>

      <View className="gap-5">
        {products.map((product) => (
          <ProductCard
            key={product.name}
            category={product.category}
            name={product.name}
            brand={product.brand}
            highlight={product.highlight}
            imageSource={product.imageSource}
            imageFallbackLabel={product.imageFallbackLabel}
            productType={product.productType}
          />
        ))}
      </View>
    </View>
  );
}
