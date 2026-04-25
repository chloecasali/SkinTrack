import { useState, type ComponentProps, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import type { ProductImageSource } from "@/types/product";

type ProductImageFrameProps = {
  imageSource?: ProductImageSource;
  imageStyle: ComponentProps<typeof Image>["style"];
  fallbackLabel: string;
  fallbackBackgroundColor: string;
  fallbackTextColor: string;
  containerClassName: string;
  fallbackClassName: string;
  fallbackTextClassName: string;
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  imageBackgroundColor?: string;
};

export default function ProductImageFrame({
  imageSource,
  imageStyle,
  fallbackLabel,
  fallbackBackgroundColor,
  fallbackTextColor,
  containerClassName,
  fallbackClassName,
  fallbackTextClassName,
  children,
  containerStyle,
  imageBackgroundColor,
}: ProductImageFrameProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage =
    !imageFailed && imageSource !== undefined && imageSource !== null;

  return (
    <View
      className={containerClassName}
      style={[
        {
          backgroundColor: hasImage
            ? imageBackgroundColor
            : fallbackBackgroundColor,
        },
        containerStyle,
      ]}
    >
      {hasImage ? (
        <Image
          source={imageSource}
          contentFit="cover"
          transition={150}
          onError={() => setImageFailed(true)}
          style={imageStyle}
        />
      ) : (
        <View
          className={fallbackClassName}
          style={{ backgroundColor: fallbackBackgroundColor }}
        >
          <Text
            className={fallbackTextClassName}
            style={{ color: fallbackTextColor }}
          >
            {fallbackLabel}
          </Text>
        </View>
      )}

      {children}
    </View>
  );
}
