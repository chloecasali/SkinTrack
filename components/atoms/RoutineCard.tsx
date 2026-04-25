import { Text, View } from "react-native";
import ProductImageFrame from "@/components/atoms/ProductImageFrame";
import { Palette, type ProductType } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { ProductImageSource } from "@/types/product";

type RoutineCardProps = {
  step: string;
  title: string;
  brandName: string;
  categoryLabel: string;
  imageSource?: ProductImageSource;
  imageFallbackLabel?: string;
  productType: ProductType;
};

export default function RoutineCard({
  step,
  title,
  brandName,
  categoryLabel,
  imageSource,
  imageFallbackLabel,
  productType,
}: RoutineCardProps) {
  const { colors, productAccents } = useAppTheme();
  const productStyle = productAccents[productType];

  return (
    <View
      className="mr-5 w-[200px] rounded-[32px] border p-4"
      style={{
        borderColor: colors.border,
        backgroundColor: colors.panel,
      }}
    >
      <ProductImageFrame
        imageSource={imageSource}
        imageStyle={{ width: "100%", height: 190 }}
        imageBackgroundColor={colors.glass}
        fallbackLabel={imageFallbackLabel || categoryLabel}
        fallbackBackgroundColor={productStyle.surface}
        fallbackTextColor={productStyle.accent}
        containerClassName="overflow-hidden rounded-[20px]"
        fallbackClassName="h-[190px] items-center justify-center px-8"
        fallbackTextClassName="text-center font-lora text-[30px] leading-8"
      >
        <View className="absolute left-4 top-4 rounded-[16px] px-3 py-2">
          <View
            className="absolute inset-0"
            style={{
              borderRadius: 16,
              backgroundColor: colors.glassStrong,
            }}
          />
          <Text
            className="font-sans-semibold text-[16px]"
            style={{ color: Palette.charcoal }}
          >
            {step}
          </Text>
        </View>
      </ProductImageFrame>

      <Text
        className="mt-5 font-sans-semibold text-[13px] uppercase tracking-[1.8px]"
        style={{ color: productStyle.accent }}
      >
        {categoryLabel}
      </Text>
      <Text
        className="mt-2 font-lora text-[16px]"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      <Text
        className="mt-1 font-sans text-[13px]"
        style={{ color: colors.textMuted }}
      >
        {brandName}
      </Text>
    </View>
  );
}
