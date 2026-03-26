import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native";

type GoogleAuthProps = {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function GoogleAuth({
  onPress,
  disabled = false,
  loading = false,
}: GoogleAuthProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={`
        mt-4 h-12 w-full flex-row items-center justify-center rounded-xl border
        ${disabled ? "border-slate-200 bg-slate-100" : "border-slate-300 bg-white"}
      `}
    >
      <Image
        source={require("../../assets/images/google/ios_neutral_sq_na.png")}
        className="mr-3 h-5 w-5"
        resizeMode="contain"
      />
      <Text
        className={`text-base font-medium ${disabled ? "text-slate-500" : "text-slate-900"}`}
      >
        Continue with Google
      </Text>
      {loading && <ActivityIndicator size="small" color="#0f172a" style={{ marginLeft: 12 }} />}
    </TouchableOpacity>
  );
}
