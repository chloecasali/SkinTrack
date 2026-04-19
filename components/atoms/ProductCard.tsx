import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type ProductType } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type ProductCardProps = {
  category: string;
  name: string;
  brand: string;
  highlight: string;
  imageUrl?: string;
  imageFallbackLabel?: string;
  productType: ProductType;
};

export default function ProductCard({
  category,
  name,
  brand,
  highlight,
  imageUrl,
  imageFallbackLabel,
  productType,
}: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
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
        <View className="w-[40%] min-h-[170px] overflow-hidden">
          {!imageFailed && imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              contentFit="cover"
              transition={150}
              onError={() => setImageFailed(true)}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <View
              className="flex-1 items-center justify-center px-5"
              style={{ backgroundColor: productStyle.surface }}
            >
              <Text
                className="text-center font-lora text-[28px] leading-8"
                style={{ color: productStyle.accent }}
              >
                {imageFallbackLabel || brand}
              </Text>
            </View>
          )}
        </View>

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
