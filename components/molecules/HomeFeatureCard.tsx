import { Text, View } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeFeatureCardProps = {
  eyebrow: string;
  title: string;
};

export default function HomeFeatureCard({
  eyebrow,
  title,
}: HomeFeatureCardProps) {
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="rounded-[20px] border px-6 py-8"
      style={[
        shadows.featureCard,
        {
          borderColor: colors.featureCardBorder,
        },
      ]}
    >
      <View className="flex-row items-start gap-5">
        <View
          className="mt-1 h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.featureIconBackground }}
        >
          <Lightbulb size={22} color={colors.featureIcon} strokeWidth={2} />
        </View>

        <View className="flex-1 pt-1">
          <Text
            className="font-sans-bold text-[16px] uppercase leading-[18px]"
            style={{ color: colors.featureEyebrowText, letterSpacing: 0.2 }}
          >
            {eyebrow}
          </Text>
          <Text
            className="mt-1 font-lora text-[13px] leading-[20px]"
            style={{ color: colors.featureTitleText }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}
