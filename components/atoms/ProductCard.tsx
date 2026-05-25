import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductImageFrame from "@/components/atoms/ProductImageFrame";
import type { ProductType } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { ProductImageSource } from "@/types/product";

type ProductCardProps = {
  category: string;
  name: string;
  brand: string;
  highlight: string;
  imageSource?: ProductImageSource;
  imageFallbackLabel?: string;
  productType: ProductType;
};

export default function ProductCard({
  category,
  name,
  brand,
  highlight,
  imageSource,
  imageFallbackLabel,
  productType,
}: ProductCardProps) {
  const { colors, productAccents, shadows } = useAppTheme();
  const productStyle = productAccents[productType];

  return (
    <View
      className="overflow-hidden rounded-[34px] border"
      style={[
        shadows.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.panel,
        },
      ]}
    >
      <View className="flex-row">
        <ProductImageFrame
          imageSource={imageSource}
          imageStyle={{ width: "100%", height: "100%" }}
          fallbackLabel={imageFallbackLabel || brand}
          fallbackBackgroundColor={productStyle.surface}
          fallbackTextColor={productStyle.accent}
          containerClassName="w-[40%] min-h-[170px] overflow-hidden"
          fallbackClassName="flex-1 items-center justify-center px-5"
          fallbackTextClassName="text-center font-lora text-[28px] leading-8"
        />

        <View className="flex-1 px-5 py-5">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text
                className="font-sans-semibold text-[13px] uppercase tracking-[2px]"
                style={{ color: productStyle.accent }}
              >
                {category}
              </Text>
            </View>

            <View
              className="h-11 w-11 items-center justify-center rounded-full border"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.elevated,
              }}
            >
              <Ionicons name="heart-outline" size={20} color={colors.text} />
            </View>
          </View>

          <Text
            className="mt-4 font-lora text-[24px] leading-8"
            style={{ color: colors.text }}
          >
            {name}
          </Text>
          <Text
            className="mt-4 font-sans text-[16px] leading-7"
            style={{ color: colors.textMuted }}
          >
            {highlight}
          </Text>
        </View>
      </View>
    </View>
  );
}
