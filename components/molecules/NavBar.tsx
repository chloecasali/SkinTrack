import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import NavButton from "@/components/atoms/NavButton";

type NavBarProps = {
  activeTab?: "home" | "search" | "scan" | "calendar" | "profile";
};

export default function NavBar({ activeTab }: NavBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="absolute bottom-0 left-0 right-0
                 flex-row bg-white border-t border-gray-200 pt-2"
    >
      <NavButton
        label="Bathroom"
        icon="home-outline"
        active={activeTab === "home"}
        onPress={() => router.push("/")}
      />

      <NavButton
        label="Search"
        icon="search-outline"
        active={activeTab === "search"}
        onPress={() => router.push("/search")}
      />

      <NavButton
        label="Scan"
        icon="scan-outline"
        active={activeTab === "scan"}
        onPress={() => router.push("/scan")}
      />

      <NavButton
        label="Calendar"
        icon="calendar-outline"
        active={activeTab === "calendar"}
        onPress={() => router.push("/calendar")}
      />

      <NavButton
        label="Profile"
        icon="person-outline"
        active={activeTab === "profile"}
        onPress={() => router.push("/profile")}
      />
    </View>
  );
}
