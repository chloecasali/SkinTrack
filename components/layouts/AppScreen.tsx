import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "@/components/molecules/NavBar";
import { useAppTheme } from "@/hooks/use-app-theme";

type ActiveTab = "home" | "search" | "scan" | "calendar" | "profile";

type AppScreenProps = {
  children: ReactNode;
  activeTab?: ActiveTab;
  scroll?: boolean;
  contentClassName?: string;
  backgroundClassName?: string;
  edges?: ("top" | "right" | "bottom" | "left")[];
};

function DecorativeBackdrop() {
  const { colors, shadows } = useAppTheme();

  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      <View
        className="absolute inset-0"
        style={{ backgroundColor: colors.shell }}
      />
      <View
        className="absolute inset-x-0 top-0 h-48"
        style={{ backgroundColor: colors.shellTopWash }}
      />
      <View
        className="absolute -right-24 -top-16 h-80 w-80 rounded-full"
        style={[shadows.glow, { backgroundColor: colors.accentPeach }]}
      />
      <View
        className="absolute -left-28 top-56 h-72 w-72 rounded-full"
        style={[shadows.glow, { backgroundColor: colors.accentLilac }]}
      />
      <View
        className="absolute right-6 top-72 h-28 w-28 rounded-full"
        style={[shadows.glow, { backgroundColor: colors.accentMint }]}
      />
      <View
        className="absolute bottom-[-120px] left-[-90px] h-96 w-96 rounded-full"
        style={[shadows.glow, { backgroundColor: colors.accentSand }]}
      />
    </View>
  );
}

export default function AppScreen({
  children,
  activeTab,
  scroll = false,
  contentClassName = "",
  backgroundClassName = "bg-shell",
  edges = ["top"],
}: AppScreenProps) {
  const { colors } = useAppTheme();
  const bottomSpacing = activeTab ? 144 : 40;

  return (
    <View
      className={`flex-1 overflow-hidden ${backgroundClassName}`}
      style={{ backgroundColor: colors.shell }}
    >
      <DecorativeBackdrop />

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
