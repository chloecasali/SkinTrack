import { Text, View } from "react-native";
import { Lightbulb } from "lucide-react-native";
import { useAppTheme } from "@/hooks/use-app-theme";
import { Palette } from "@/constants/theme";

type HomeFeatureCardProps = {
  eyebrow: string;
  title: string;
};

export default function HomeFeatureCard({
  eyebrow,
  title,
}: HomeFeatureCardProps) {
  const { shadows } = useAppTheme();

  return (
    <View
      className="rounded-[18px] border px-4 py-4"
      style={[
        shadows.card,
        {
          borderColor: Palette.warmNude,
        },
      ]}
    >
      <View className="flex-row items-start gap-5">
        <View
          className="mt-1 h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: Palette.skinBeige }}
        >
          <Lightbulb size={18} color={Palette.cream} strokeWidth={2} />
        </View>

        <View className="flex-1 pt-1">
          <Text
            className="font-sans-semibold text-[12px] uppercase leading-[22px]"
            style={{ color: Palette.charcoal, letterSpacing: 0.1 }}
          >
            {eyebrow}
          </Text>
          <Text
            className="mt-2 font-lora text-[12px] leading-[18px]"
            style={{ color: Palette.charcoal }}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}
