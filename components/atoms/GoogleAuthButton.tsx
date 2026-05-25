import { Image, Platform, TouchableOpacity } from "react-native";

type GoogleAuthButtonProps = {
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
  loading?: boolean;
};

type GoogleButtonPlatform = "android" | "ios";

const googleButtonConfig: Record<
  GoogleButtonPlatform,
  { source: number; size: { width: number; height: number } }
> = {
  android: {
    source: require("../../assets/images/google/Android/light/continue.png"),
    size: {
      width: 189,
      height: 40,
    },
  },
  ios: {
    source: require("../../assets/images/google/iOS/light/continue.png"),
    size: {
      width: 199,
      height: 44,
    },
  },
};

export default function GoogleAuthButton({
  onPress,
  accessibilityLabel,
  disabled = false,
  loading = false,
}: GoogleAuthButtonProps) {
  const platform: GoogleButtonPlatform =
    Platform.OS === "android" ? "android" : "ios";
  const { size, source } = googleButtonConfig[platform];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className="mt-4 self-center"
      style={{ opacity: isDisabled ? 0.5 : 1 }}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
    >
      <Image source={source} resizeMode="contain" style={size} />
    </TouchableOpacity>
  );
}
