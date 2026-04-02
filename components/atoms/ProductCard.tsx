import { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { type AccentTone } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";

type ProductCardProps = {
  category: string;
  name: string;
  brand: string;
  highlight: string;
  imageUrl?: string;
  imageFallbackLabel?: string;
  tone?: AccentTone;
};

export default function ProductCard({
  category,
  name,
  brand,
  highlight,
  imageUrl,
  imageFallbackLabel,
  tone = "sand",
}: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { accents, colors, shadows } = useAppTheme();
  const toneStyle = accents[tone];

  return (
    <View
      className="mr-4 w-[186px] rounded-[30px] border p-4"
      style={[
        shadows.card,
        {
          borderColor: colors.border,
          backgroundColor: colors.panel,
        },
      ]}
    >
      <View
        className="mb-4 overflow-hidden rounded-[26px] px-3 pb-3 pt-3"
        style={{ backgroundColor: toneStyle.surface }}
      >
        <View className="flex-row items-center justify-between gap-3">
          <View
            className="rounded-full px-3 py-1.5"
            style={{ backgroundColor: toneStyle.highlight }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[1.8px]"
              style={{ color: toneStyle.accent }}
            >
              {category}
            </Text>
          </View>

          <View
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.glass }}
          >
            <Ionicons name="heart-outline" size={15} color={colors.primary} />
          </View>
        </View>

        {!imageFailed && imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            contentFit="contain"
            transition={150}
            onError={() => setImageFailed(true)}
            style={{ width: "100%", height: 130, marginTop: 12 }}
          />
        ) : (
          <View
            className="mt-4 h-[130px] items-center justify-center rounded-[20px] border"
            style={{
              borderColor: colors.borderSoft,
              backgroundColor: colors.glass,
            }}
          >
            <Text
              className="font-lora text-2xl"
              style={{ color: colors.textSubtle }}
            >
              {imageFallbackLabel || brand}
            </Text>
          </View>
        )}
      </View>

      <Text
        className="font-lora text-[22px] leading-7"
        style={{ color: colors.text }}
      >
        {name}
      </Text>
      <Text
        className="mt-1 font-sans text-sm"
        style={{ color: colors.textMuted }}
      >
        {brand}
      </Text>
      <Text
        className="mt-3 font-sans-medium text-sm"
        style={{ color: colors.primary }}
      >
        {highlight}
      </Text>
    </View>
  );
}
