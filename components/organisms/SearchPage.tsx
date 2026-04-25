import { startTransition, useDeferredValue, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import SectionHeader from "@/components/atoms/SectionHeader";
import { searchSuggestionChips } from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";
export default function SearchPage() {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();
  const [query, setQuery] = useState("");
  useDeferredValue(query.trim().toLowerCase());
  return (
    <AppScreen activeTab="search" scroll contentClassName="gap-6">
      <View
        className="overflow-hidden rounded-[38px] border px-5 py-5"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panelSoft },
        ]}
      >
        <SectionHeader
          eyebrow={t("nav.search")}
          title={t("search.title")}
          description={t("search.subtitle")}
        />

        <View
          className="overflow-hidden rounded-[30px] border"
          style={{ borderColor: colors.border, backgroundColor: colors.glass }}
        >
          <BlurView
            intensity={38}
            tint={colors.blurTint}
            style={StyleSheet.absoluteFill}
          />

          <View className="flex-row items-center gap-3 px-4 py-4">
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.navIconInactive}
            />

            <TextInput
              value={query}
              onChangeText={(text) => {
                startTransition(() => {
                  setQuery(text);
                });
              }}
              placeholder={t("search.placeholder")}
              placeholderTextColor={colors.inputPlaceholder}
              className="flex-1 font-sans text-base"
              style={{ color: colors.text }}
            />

            {query ? (
              <Pressable
                onPress={() => setQuery("")}
                className="h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.glassStrong }}
              >
                <Ionicons name="close" size={18} color={colors.primary} />
              </Pressable>
            ) : null}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="mt-4"
        >
          <View className="flex-row gap-3">
            {searchSuggestionChips.map((chip) => (
              <Pressable
                key={chip}
                onPress={() => setQuery(chip)}
                className="rounded-full border px-4 py-3"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.elevated,
                }}
              >
                <Text
                  className="font-sans-medium text-sm capitalize"
                  style={{ color: colors.text }}
                >
                  {chip}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
}
