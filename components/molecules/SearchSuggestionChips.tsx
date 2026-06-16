import { Pressable, ScrollView, Text, View } from "react-native";
import { searchSuggestionChips } from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";

type SearchSuggestionChipsProps = {
  onSelect: (value: string) => void;
};

export default function SearchSuggestionChips({
  onSelect,
}: SearchSuggestionChipsProps) {
  const { colors } = useAppTheme();

  return (
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
            onPress={() => onSelect(chip)}
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
  );
}
