import type { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/hooks/use-app-theme";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  showBackButton?: boolean;
};

export default function AuthScreen({
  title,
  subtitle,
  children,
  footer,
  showBackButton = false,
}: AuthScreenProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();
  const canGoBack = showBackButton && router.canGoBack();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.shell }}>
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-5 pt-4">
            <View className="mb-10">
              {canGoBack ? (
                <TouchableOpacity
                  accessibilityLabel={t("common.back")}
                  activeOpacity={0.8}
                  className="h-11 w-11 items-center justify-center rounded-full border"
                  onPress={() => router.back()}
                  style={{
                    backgroundColor: colors.panelSoft,
                    borderColor: colors.border,
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color={colors.text} />
                </TouchableOpacity>
              ) : null}

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
