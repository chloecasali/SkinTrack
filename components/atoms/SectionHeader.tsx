import { Text, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  actionLabel,
}: SectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View className="mb-4 flex-row items-end justify-between gap-4">
      <View className="flex-1">
        {eyebrow ? (
          <Text
            className="mb-2 font-sans-medium text-[11px] uppercase tracking-[2.6px]"
            style={{ color: colors.primary }}
          >
            {eyebrow}
          </Text>
        ) : null}
        <Text
          className="font-lora text-[34px] leading-[38px]"
          style={{ color: colors.text }}
        >
          {title}
        </Text>
        {description ? (
          <Text
            className="mt-2 max-w-[320px] font-sans text-[15px] leading-6"
            style={{ color: colors.textMuted }}
          >
            {description}
          </Text>
        ) : null}
      </View>

      {actionLabel ? (
        <View
          className="rounded-full border px-4 py-2"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.glass,
          }}
        >
          <Text
            className="font-sans-medium text-xs uppercase tracking-[2px]"
            style={{ color: colors.primary }}
          >
            {actionLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
