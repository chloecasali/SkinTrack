import { View } from "react-native";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/components/atoms/SectionHeader";
import SearchInputCard from "@/components/molecules/SearchInputCard";
import SearchSuggestionChips from "@/components/molecules/SearchSuggestionChips";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useSearchQuery } from "@/hooks/search/useSearchQuery";

export default function SearchPanel() {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();
  const { clearQuery, query, setQuery } = useSearchQuery();

  return (
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

      <SearchInputCard
        query={query}
        onChangeQuery={setQuery}
        onClearQuery={clearQuery}
      />

      <SearchSuggestionChips onSelect={setQuery} />
    </View>
  );
}
