import type { ReactNode } from "react";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AUTH_PATHS } from "@/constants/paths";
import NavBar from "@/components/molecules/NavBar";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useToken } from "@/services/auth/token";

type ActiveTab = "home" | "search" | "scan" | "calendar" | "profile";

type AppScreenProps = {
  children: ReactNode;
  activeTab?: ActiveTab;
  scroll?: boolean;
  contentClassName?: string;
  backgroundClassName?: string;
  edges?: ("top" | "right" | "bottom" | "left")[];
};

export default function AppScreen({
  children,
  activeTab,
  scroll = false,
  contentClassName = "",
  backgroundClassName = "bg-shell",
  edges = ["top"],
}: AppScreenProps) {
  const { colors } = useAppTheme();
  const router = useRouter();
  const token = useToken();
  const bottomSpacing = activeTab ? 144 : 40;
  const shouldRedirectToLogin = token === null;

  useEffect(() => {
    if (shouldRedirectToLogin) {
      router.replace(AUTH_PATHS.login);
    }
  }, [router, shouldRedirectToLogin]);

  if (token === undefined || shouldRedirectToLogin) {
    return (
      <View
        className={`flex-1 overflow-hidden ${backgroundClassName}`}
        style={{ backgroundColor: colors.shell }}
      >
        <SafeAreaView className="flex-1" edges={edges}>
          <View className="flex-1 items-center justify-center px-5">
            <ActivityIndicator size="large" color={colors.activityIndicator} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View
      className={`flex-1 overflow-hidden ${backgroundClassName}`}
      style={{ backgroundColor: colors.shell }}
    >
      <SafeAreaView className="flex-1" edges={edges}>
        {scroll ? (
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: bottomSpacing }}
            keyboardShouldPersistTaps="handled"
          >
            <View className={`px-5 pt-4 ${contentClassName}`}>{children}</View>
          </ScrollView>
        ) : (
          <View
            className={`flex-1 px-5 pt-4 ${contentClassName}`}
            style={{ paddingBottom: bottomSpacing }}
          >
            {children}
          </View>
        )}
      </SafeAreaView>

      {activeTab ? <NavBar activeTab={activeTab} /> : null}
    </View>
  );
}
