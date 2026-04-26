import { Pressable, Text, View } from "react-native";
import type { CalendarStripItem } from "@/hooks/calendar/useCalendarState";
import { useAppTheme } from "@/hooks/use-app-theme";

type CalendarDateStripProps = {
  items: CalendarStripItem[];
  selectedDateKey: string;
  onSelect: (dateKey: string) => void;
};

export default function CalendarDateStrip({
  items,
  selectedDateKey,
  onSelect,
}: CalendarDateStripProps) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-row gap-3">
      {items.map((item) => {
        const active = item.key === selectedDateKey;

        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect(item.key)}
            className="w-[86px] rounded-[26px] border px-3 py-4"
            style={({ pressed }) => ({
              opacity: pressed ? 0.82 : 1,
              borderColor: active ? colors.primary : colors.border,
              backgroundColor: active ? colors.elevated : colors.glass,
            })}
          >
            <Text
              className={`text-center ${active ? "font-lora text-[28px]" : "font-lora text-[24px]"}`}
              style={{
                color: active
                  ? colors.text
                  : item.isToday
                    ? colors.primary
                    : colors.textMuted,
              }}
            >
              {item.dayNumber}
            </Text>
            <Text
              className="mt-1 text-center font-sans text-sm"
              style={{
                color: item.isToday ? colors.primary : colors.textMuted,
              }}
            >
              {item.weekdayLabel}
            </Text>
            <Text
              className="mt-3 text-center font-sans-medium text-[11px] uppercase tracking-[1.8px]"
              style={{ color: colors.primary }}
            >
              {item.progressLabel}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
