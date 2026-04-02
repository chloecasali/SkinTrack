import type { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/hooks/use-app-theme";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthScreen({
  title,
  subtitle,
  children,
  footer,
}: AuthScreenProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.shell }}>
      <View className="absolute inset-0 overflow-hidden">
        <View
          className="absolute -right-20 -top-12 h-72 w-72 rounded-full"
          style={{ backgroundColor: colors.accentPeach }}
        />
        <View
          className="absolute left-[-64px] top-32 h-52 w-52 rounded-full"
          style={{ backgroundColor: colors.accentLilac }}
        />
        <View
          className="absolute bottom-16 right-10 h-28 w-28 rounded-full"
          style={{ backgroundColor: colors.accentMint }}
        />
      </View>

      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4">
            <View className="mb-10">
              <View className="flex-row items-center justify-between gap-4">
                <View
                  className="self-start rounded-full border px-4 py-2"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: colors.glass,
                  }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[2.4px]"
                    style={{ color: colors.primary }}
                  >
                    SkinTrack
                  </Text>
                </View>

                <View
                  className="rounded-full px-3.5 py-2"
                  style={{ backgroundColor: colors.glass }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                    style={{ color: colors.textMuted }}
                  >
                    {t("auth.heroPrivate")}
                  </Text>
                </View>
              </View>

              <Text
                className="mt-6 max-w-[320px] font-lora text-[42px] leading-[46px]"
                style={{ color: colors.text }}
              >
                {title}
              </Text>

              <Text
                className="mt-3 max-w-[320px] font-sans text-base leading-6"
                style={{ color: colors.textMuted }}
              >
                {subtitle}
              </Text>
            </View>

            <View
              className="rounded-[36px] border px-5 py-6"
              style={[
                shadows.floating,
                {
                  backgroundColor: colors.panel,
                  borderColor: colors.border,
                },
              ]}
            >
              <View className="mb-6 flex-row gap-3">
                <View
                  className="flex-1 rounded-[24px] px-4 py-3"
                  style={{ backgroundColor: colors.panelSoft }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                    style={{ color: colors.primary }}
                  >
                    {t("auth.heroTrackTitle")}
                  </Text>
                  <Text
                    className="mt-2 font-sans text-sm leading-5"
                    style={{ color: colors.textMuted }}
                  >
                    {t("auth.heroTrackBody")}
                  </Text>
                </View>

                <View
                  className="flex-1 rounded-[24px] px-4 py-3"
                  style={{ backgroundColor: colors.panelMuted }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                    style={{ color: colors.primary }}
                  >
                    {t("auth.heroScanTitle")}
                  </Text>
                  <Text
                    className="mt-2 font-sans text-sm leading-5"
                    style={{ color: colors.textMuted }}
                  >
                    {t("auth.heroScanBody")}
                  </Text>
                </View>
              </View>

              {children}
            </View>

            {footer ? (
              <View className="mt-6 items-center">{footer}</View>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
