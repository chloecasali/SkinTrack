import { useState } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Palette, type ProductType } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type RoutineCardProps = {
  step: string;
  title: string;
  brandName: string;
  categoryLabel: string;
  imageUrl?: string;
  imageFallbackLabel?: string;
  productType: ProductType;
};

export default function RoutineCard({
  step,
  title,
  brandName,
  categoryLabel,
  imageUrl,
  imageFallbackLabel,
  productType,
}: RoutineCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
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
      <View
        className="overflow-hidden rounded-[20px]"
        style={{
          backgroundColor:
            imageFailed || !imageUrl ? productStyle.surface : colors.glass,
        }}
      >
        {!imageFailed && imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            contentFit="cover"
            transition={150}
            onError={() => setImageFailed(true)}
            style={{ width: "100%", height: 190 }}
          />
        ) : (
          <View
            className="h-[190px] items-center justify-center px-8"
            style={{ backgroundColor: productStyle.surface }}
          >
            <Text
              className="text-center font-lora text-[30px] leading-8"
              style={{ color: productStyle.accent }}
            >
              {imageFallbackLabel || categoryLabel}
            </Text>
          </View>
        )}

        <View className="absolute left-4 top-4 rounded-[16px] border px-3 py-2">
          <View
            className="absolute inset-0"
            style={{
              borderRadius: 16,
              borderColor: Palette.wine,
              backgroundColor: colors.glassStrong,
            }}
          />
          <Text
            className="font-sans-semibold text-[16px]"
            style={{ color: Palette.wine }}
          >
            {step}
          </Text>
        </View>
      </View>

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
