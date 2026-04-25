import { Text, View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
};

export default function SectionHeader({ actionLabel }: SectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View className="mb-4 flex-row items-end justify-between gap-4">
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
