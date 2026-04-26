import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { getLocalDateKey } from "@/utils/calendar";
import { useAppTheme } from "@/hooks/use-app-theme";

type CalendarMonthModalProps = {
  visible: boolean;
  monthCells: (Date | null)[];
  selectedDateKey: string;
  todayKey: string;
  visibleMonthDate: Date;
  visibleMonthLabel: string;
  visibleMonthName: string;
  weekdayHeaders: string[];
  onClose: () => void;
  onDateSelection: (date: Date) => void;
  onNextMonth: () => void;
  onNextYear: () => void;
  onPreviousMonth: () => void;
  onPreviousYear: () => void;
};

export default function CalendarMonthModal({
  visible,
  monthCells,
  selectedDateKey,
  todayKey,
  visibleMonthDate,
  visibleMonthLabel,
  visibleMonthName,
  weekdayHeaders,
  onClose,
  onDateSelection,
  onNextMonth,
  onNextYear,
  onPreviousMonth,
  onPreviousYear,
}: CalendarMonthModalProps) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-end"
        style={{ backgroundColor: colors.overlay }}
      >
        <Pressable className="absolute inset-0" onPress={onClose} />

        <View
          className="mt-12 flex-1 overflow-hidden rounded-t-[38px] border px-5 pb-8 pt-6"
          style={[
            shadows.floating,
            {
              borderColor: colors.border,
              backgroundColor: colors.glassStrong,
            },
          ]}
        >
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1">
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {t("nav.calendar")}
              </Text>
              <Text
                className="mt-3 font-lora text-[34px] leading-9"
                style={{ color: colors.text }}
              >
                {visibleMonthLabel}
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("calendar.closeFullCalendar")}
              onPress={onClose}
              className="h-12 w-12 items-center justify-center rounded-full border"
              style={({ pressed }) => ({
                opacity: pressed ? 0.82 : 1,
                borderColor: colors.border,
                backgroundColor: colors.elevated,
              })}
            >
              <Ionicons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>

          <View className="mt-6 flex-row items-center gap-3">
            <View className="flex-row gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("calendar.previousYear")}
                onPress={onPreviousYear}
                className="h-12 w-12 items-center justify-center rounded-full border"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.82 : 1,
                  borderColor: colors.border,
                  backgroundColor: colors.panelSoft,
                })}
              >
                <Ionicons
                  name="play-skip-back"
                  size={18}
                  color={colors.primary}
                />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("calendar.previousMonth")}
                onPress={onPreviousMonth}
                className="h-12 w-12 items-center justify-center rounded-full border"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.82 : 1,
                  borderColor: colors.border,
                  backgroundColor: colors.panelSoft,
                })}
              >
                <Ionicons
                  name="chevron-back"
                  size={18}
                  color={colors.primary}
                />
              </Pressable>
            </View>

            <View
              className="flex-1 rounded-[28px] border px-4 py-4"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.panelSoft,
              }}
            >
              <Text
                className="text-center font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {visibleMonthDate.getFullYear()}
              </Text>
              <Text
                className="mt-2 text-center font-lora text-[28px] leading-8"
                style={{ color: colors.text }}
              >
                {visibleMonthName}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("calendar.nextMonth")}
                onPress={onNextMonth}
                className="h-12 w-12 items-center justify-center rounded-full border"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.82 : 1,
                  borderColor: colors.border,
                  backgroundColor: colors.panelSoft,
                })}
              >
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.primary}
                />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("calendar.nextYear")}
                onPress={onNextYear}
                className="h-12 w-12 items-center justify-center rounded-full border"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.82 : 1,
                  borderColor: colors.border,
                  backgroundColor: colors.panelSoft,
                })}
              >
                <Ionicons
                  name="play-skip-forward"
                  size={18}
                  color={colors.primary}
                />
              </Pressable>
            </View>
          </View>

          <View
            className="mt-6 rounded-[32px] border p-4"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.panel,
            }}
          >
            <View className="flex-row">
              {weekdayHeaders.map((weekday) => (
                <View
                  key={weekday}
                  className="mb-3 items-center"
                  style={{ width: "14.285714%" }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[1.6px]"
                    style={{ color: colors.textMuted }}
                  >
                    {weekday}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {monthCells.map((date, index) => {
                if (!date) {
                  return (
                    <View
                      key={`empty-${index}`}
                      className="mb-2 items-center justify-center"
                      style={{ width: "14.285714%", height: 58 }}
                    />
                  );
                }

                const dateKey = getLocalDateKey(date);
                const isSelected = dateKey === selectedDateKey;
                const isToday = dateKey === todayKey;

                return (
                  <View
                    key={dateKey}
                    className="mb-2 items-center justify-center"
                    style={{ width: "14.285714%" }}
                  >
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => onDateSelection(date)}
                      className="h-[58px] w-[42px] items-center justify-center rounded-[18px] border"
                      style={({ pressed }) => ({
                        opacity: pressed ? 0.82 : 1,
                        borderColor: isSelected
                          ? colors.primary
                          : isToday
                            ? colors.primary
                            : colors.border,
                        backgroundColor: isSelected
                          ? colors.primary
                          : isToday
                            ? colors.primarySoft
                            : colors.elevated,
                      })}
                    >
                      <Text
                        className="font-sans-semibold text-base"
                        style={{
                          color: isSelected
                            ? colors.primaryContrast
                            : isToday
                              ? colors.primary
                              : colors.text,
                        }}
                      >
                        {date.getDate()}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
