import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@/hooks/use-app-theme";

type SearchInputCardProps = {
  query: string;
  onChangeQuery: (text: string) => void;
  onClearQuery: () => void;
};

export default function SearchInputCard({
  query,
  onChangeQuery,
  onClearQuery,
}: SearchInputCardProps) {
  const { t } = useTranslation();
  const { colors } = useAppTheme();

  return (
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
          onChangeText={onChangeQuery}
          placeholder={t("search.placeholder")}
          placeholderTextColor={colors.inputPlaceholder}
          className="flex-1 font-sans text-base"
          style={{ color: colors.text }}
        />

        {query ? (
          <Pressable
            onPress={onClearQuery}
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.glassStrong }}
          >
            <Ionicons name="close" size={18} color={colors.primary} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
