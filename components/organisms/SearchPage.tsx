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
import {
  searchItems,
  searchSuggestionChips,
  type SearchItem,
} from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";

function SearchResultCard({ item }: { item: SearchItem }) {
  const { colors, productAccents, shadows } = useAppTheme();
  const productStyle = productAccents[item.productType];

  return (
    <View
      className="rounded-[30px] border p-4"
      style={[
        shadows.card,
        { borderColor: colors.border, backgroundColor: colors.panel },
      ]}
    >
      <View className="flex-row gap-4">
        <View
          className="w-24 rounded-[24px] px-3 py-3"
          style={{ backgroundColor: productStyle.surface }}
        >
          <View
            className="self-start rounded-full px-3 py-1.5"
            style={{ backgroundColor: productStyle.highlight }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[1.8px]"
              style={{ color: productStyle.accent }}
            >
              {item.category}
            </Text>
          </View>

          <Text
            className="mt-8 font-lora text-[30px] leading-8"
            style={{ color: colors.text }}
          >
            {item.name.slice(0, 2)}
          </Text>
        </View>

        <View className="flex-1">
          <Text
            className="font-lora text-[28px] leading-8"
            style={{ color: colors.text }}
          >
            {item.name}
          </Text>
          <Text
            className="mt-1 font-sans text-sm"
            style={{ color: colors.textMuted }}
          >
            {item.brand}
          </Text>
          <Text
            className="mt-3 font-sans text-[15px] leading-6"
            style={{ color: colors.textMuted }}
          >
            {item.benefit}
          </Text>

          <View className="mt-4 flex-row flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <View
                key={tag}
                className="rounded-full px-3 py-2"
                style={{ backgroundColor: colors.panelSoft }}
              >
                <Text
                  className="font-sans-medium text-[11px] uppercase tracking-[1.6px]"
                  style={{ color: colors.textMuted }}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export default function SearchPage() {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredItems = deferredQuery
    ? searchItems.filter((item) => {
        const haystack = [
          item.name,
          item.brand,
          item.category,
          item.benefit,
          ...item.tags,
        ]
          .join(" ")
          .toLowerCase();

        return haystack.includes(deferredQuery);
      })
    : searchItems;

  const hasQuery = deferredQuery.length > 0;
  const discoveryItem = searchItems[1];

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

      {!hasQuery ? (
        <>
          <View
            className="overflow-hidden rounded-[34px] border px-5 py-5"
            style={[
              shadows.card,
              {
                borderColor: colors.border,
                backgroundColor: colors.panelMuted,
              },
            ]}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("search.discoveryEyebrow")}
            </Text>
            <Text
              className="mt-3 max-w-[240px] font-lora text-[34px] leading-9"
              style={{ color: colors.text }}
            >
              {t("search.discoveryTitle")}
            </Text>
            <Text
              className="mt-3 max-w-[280px] font-sans text-[15px] leading-6"
              style={{ color: colors.textMuted }}
            >
              {t("search.discoveryBody")}
            </Text>

            <View
              className="mt-5 rounded-[28px] px-4 py-4"
              style={{ backgroundColor: colors.panelSoft }}
            >
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {discoveryItem.category}
              </Text>
              <Text
                className="mt-2 font-sans-semibold text-lg"
                style={{ color: colors.text }}
              >
                {discoveryItem.name}
              </Text>
              <Text
                className="mt-2 font-sans text-sm leading-6"
                style={{ color: colors.textMuted }}
              >
                {discoveryItem.benefit}
              </Text>
            </View>
          </View>

          <SectionHeader
            eyebrow={t("search.defaultEyebrow")}
            title={t("search.defaultTitle")}
            description={t("search.defaultSubtitle")}
          />
        </>
      ) : (
        <SectionHeader
          eyebrow={t("search.resultsEyebrow")}
          title={t("search.resultsTitle")}
          description={t("search.resultsCount", {
            count: filteredItems.length,
          })}
        />
      )}

      {filteredItems.length ? (
        <View className="gap-4 pb-4">
          {(hasQuery ? filteredItems : searchItems.slice(0, 4)).map((item) => (
            <SearchResultCard key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <View
          className="rounded-[32px] border p-6"
          style={[
            shadows.card,
            { borderColor: colors.border, backgroundColor: colors.panel },
          ]}
        >
          <Text
            className="font-lora text-[34px] leading-10"
            style={{ color: colors.text }}
          >
            {t("search.emptyTitle")}
          </Text>
          <Text
            className="mt-3 font-sans text-base leading-6"
            style={{ color: colors.textMuted }}
          >
            {t("search.emptyBody")}
          </Text>
        </View>
      )}
    </AppScreen>
  );
}
