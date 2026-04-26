import { Image, Platform, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

type GoogleAuthProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const IOS_BUTTON_SIZE = {
  width: 199,
  height: 44,
} as const;

const ANDROID_BUTTON_SIZE = {
  width: 189,
  height: 40,
} as const;

const googleButtonSources = {
  android: require("../../assets/images/google/Android/light/continue.png"),
  ios: require("../../assets/images/google/iOS/light/continue.png"),
} as const;

export default function GoogleAuth({
  onPress,
  disabled = false,
  loading = false,
}: GoogleAuthProps) {
  const { t } = useTranslation();
  const platform = Platform.OS === "android" ? "android" : "ios";
  const buttonSize =
    platform === "android" ? ANDROID_BUTTON_SIZE : IOS_BUTTON_SIZE;
  const buttonSource = googleButtonSources[platform];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      className="mt-4 self-center"
      style={{ opacity: isDisabled ? 0.5 : 1 }}
      accessibilityRole="button"
      accessibilityLabel={t("auth.login.googleButtonA11yLabel")}
    >
      <Image source={buttonSource} resizeMode="contain" style={buttonSize} />
    </TouchableOpacity>
  );
}
