import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import CalendarDateStrip from "@/components/molecules/CalendarDateStrip";
import type { CalendarStripItem } from "@/hooks/calendar/useCalendarState";
import { useAppTheme } from "@/hooks/use-app-theme";

type CalendarHeroCardProps = {
  headerTitle: string;
  selectedDateKey: string;
  stripItems: CalendarStripItem[];
  onOpenCalendar: () => void;
  onSelectDate: (dateKey: string) => void;
};

export default function CalendarHeroCard({
  headerTitle,
  selectedDateKey,
  stripItems,
  onOpenCalendar,
  onSelectDate,
}: CalendarHeroCardProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View
      className="overflow-hidden rounded-[40px] border px-5 py-5"
      style={[
        shadows.floating,
        { borderColor: colors.border, backgroundColor: colors.panelSoft },
      ]}
    >
      <View className="mb-4 flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text
            className="mb-2 font-sans-medium text-[11px] uppercase tracking-[2.6px]"
            style={{ color: colors.primary }}
          >
            {t("nav.calendar")}
          </Text>
          <Text
            className="font-lora text-[34px] leading-[38px]"
            style={{ color: colors.text }}
          >
            {headerTitle}
          </Text>
          <Text
            className="mt-2 max-w-[320px] font-sans text-[15px] leading-6"
            style={{ color: colors.textMuted }}
          >
            {t("calendar.todaySubtitle")}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("calendar.openFullCalendar")}
          onPress={onOpenCalendar}
          className="h-12 w-12 items-center justify-center rounded-full border"
          style={({ pressed }) => ({
            opacity: pressed ? 0.82 : 1,
            borderColor: colors.border,
            backgroundColor: colors.elevated,
          })}
        >
          <Ionicons name="calendar-outline" size={22} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        className="mt-1"
      >
        <CalendarDateStrip
          items={stripItems}
          selectedDateKey={selectedDateKey}
          onSelect={onSelectDate}
        />
      </ScrollView>
    </View>
  );
}
