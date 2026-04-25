import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import { calendarRoutineStepsByDay } from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";
import { useAppLanguage } from "@/services/language";

const CALENDAR_STRIP_OFFSETS = [-1, 0, 1] as const;

type RoutineDayId = keyof typeof calendarRoutineStepsByDay;

function getLocale(language: string | undefined): string {
  return language === "fr" ? "fr-FR" : "en-US";
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addYears(date: Date, amount: number): Date {
  return new Date(date.getFullYear() + amount, date.getMonth(), 1);
}

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseLocalDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isSameLocalDay(left: Date, right: Date): boolean {
  return getLocalDateKey(left) === getLocalDateKey(right);
}

function getRoutineDayId(date: Date): RoutineDayId {
  switch (date.getDay()) {
    case 1:
      return "mon";
    case 2:
      return "tue";
    case 3:
      return "wed";
    case 4:
      return "thu";
    default:
      return "fri";
  }
}

function getProgressLabel(date: Date): string {
  const steps = calendarRoutineStepsByDay[getRoutineDayId(date)];
  const completedCount = steps.filter((step) => step.completed).length;

  return `${completedCount}/${steps.length}`;
}

function normalizeWeekdayLabel(label: string): string {
  return label.replace(/\./g, "");
}

function getWeekdayHeaders(locale: string, weekStartsOn: number): string[] {
  const sundayReference = new Date(2024, 0, 7);

  return Array.from({ length: 7 }, (_, index) => {
    const weekdayDate = addDays(sundayReference, (weekStartsOn + index) % 7);

    return normalizeWeekdayLabel(
      new Intl.DateTimeFormat(locale, { weekday: "short" }).format(weekdayDate),
    );
  });
}

function getMonthCells(monthDate: Date, weekStartsOn: number): (Date | null)[] {
  const firstDay = startOfMonth(monthDate);
  const totalDays = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0,
  ).getDate();
  const leadingEmptyCells = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const cells: (Date | null)[] = Array.from(
    { length: leadingEmptyCells },
    () => null,
  );

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
  }

  const trailingEmptyCells = (7 - (cells.length % 7)) % 7;

  for (let index = 0; index < trailingEmptyCells; index += 1) {
    cells.push(null);
  }

  return cells;
}

export default function CalendarScreen() {
  const { t } = useTranslation();
  const { colors, productAccents, shadows } = useAppTheme();
  const language = useAppLanguage();
  const locale = useMemo(() => getLocale(language), [language]);
  const weekStartsOn = language === "fr" ? 1 : 0;
  const today = useMemo(() => startOfLocalDay(new Date()), []);
  const todayKey = useMemo(() => getLocalDateKey(today), [today]);
  const [selectedDateKey, setSelectedDateKey] = useState(() =>
    getLocalDateKey(new Date()),
  );
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [visibleMonthDate, setVisibleMonthDate] = useState(() =>
    startOfMonth(new Date()),
  );

  const selectedDate = useMemo(
    () => parseLocalDateKey(selectedDateKey),
    [selectedDateKey],
  );
  const selectedRoutineDayId = useMemo(
    () => getRoutineDayId(selectedDate),
    [selectedDate],
  );
  const steps = useMemo(
    () => calendarRoutineStepsByDay[selectedRoutineDayId],
    [selectedRoutineDayId],
  );
  const completedCount = steps.filter((step) => step.completed).length;
  const headerTitle = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(selectedDate),
    [locale, selectedDate],
  );
  const stripItems = useMemo(
    () =>
      CALENDAR_STRIP_OFFSETS.map((offset) => {
        const date = addDays(selectedDate, offset);

        return {
          key: getLocalDateKey(date),
          dayNumber: String(date.getDate()),
          weekdayLabel: normalizeWeekdayLabel(
            new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date),
          ),
          progressLabel: getProgressLabel(date),
          isToday: isSameLocalDay(date, today),
        };
      }),
    [locale, selectedDate, today],
  );
  const visibleMonthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(visibleMonthDate),
    [locale, visibleMonthDate],
  );
  const visibleMonthName = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(visibleMonthDate),
    [locale, visibleMonthDate],
  );
  const weekdayHeaders = useMemo(
    () => getWeekdayHeaders(locale, weekStartsOn),
    [locale, weekStartsOn],
  );
  const monthCells = useMemo(
    () => getMonthCells(visibleMonthDate, weekStartsOn),
    [visibleMonthDate, weekStartsOn],
  );

  const openCalendar = () => {
    setVisibleMonthDate(startOfMonth(selectedDate));
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const handleDateSelection = (date: Date) => {
    setSelectedDateKey(getLocalDateKey(date));
    setVisibleMonthDate(startOfMonth(date));
    setCalendarVisible(false);
  };

  return (
    <AppScreen activeTab="calendar" scroll contentClassName="gap-6">
      <Modal
        visible={calendarVisible}
        transparent
        animationType="fade"
        onRequestClose={closeCalendar}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: colors.overlay }}
        >
          <Pressable className="absolute inset-0" onPress={closeCalendar} />

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
                onPress={closeCalendar}
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
                  onPress={() =>
                    setVisibleMonthDate((currentDate) =>
                      addYears(currentDate, -1),
                    )
                  }
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
                  onPress={() =>
                    setVisibleMonthDate((currentDate) =>
                      addMonths(currentDate, -1),
                    )
                  }
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
                  onPress={() =>
                    setVisibleMonthDate((currentDate) =>
                      addMonths(currentDate, 1),
                    )
                  }
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
                  onPress={() =>
                    setVisibleMonthDate((currentDate) =>
                      addYears(currentDate, 1),
                    )
                  }
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
                        onPress={() => handleDateSelection(date)}
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
            onPress={openCalendar}
            className="h-12 w-12 items-center justify-center rounded-full border"
            style={({ pressed }) => ({
              opacity: pressed ? 0.82 : 1,
              borderColor: colors.border,
              backgroundColor: colors.elevated,
            })}
          >
            <Ionicons
              name="calendar-outline"
              size={22}
              color={colors.primary}
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="mt-1"
        >
          <View className="flex-row gap-3">
            {stripItems.map((item) => {
              const active = item.key === selectedDateKey;

              return (
                <Pressable
                  key={item.key}
                  onPress={() => setSelectedDateKey(item.key)}
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
        </ScrollView>
      </View>

      <View
        className="rounded-[34px] border p-5"
        style={[
          shadows.card,
          { borderColor: colors.border, backgroundColor: colors.panel },
        ]}
      >
        <View className="flex-row items-end justify-between gap-4">
          <View className="flex-1">
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("calendar.stepsLabel")}
            </Text>
            <Text
              className="mt-3 font-lora text-[34px] leading-9"
              style={{ color: colors.text }}
            >
              {t("calendar.stepsTitle")}
            </Text>
          </View>

          <View
            className="rounded-[24px] px-4 py-3"
            style={{ backgroundColor: colors.panelSoft }}
          >
            <Text
              className="font-sans-medium text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.primary }}
            >
              {t("calendar.completedLabel")}
            </Text>
            <Text
              className="mt-1 font-lora text-[26px] leading-7"
              style={{ color: colors.text }}
            >
              {completedCount}/{steps.length}
            </Text>
          </View>
        </View>

        <View className="mt-5 gap-3">
          {steps.map((step) => {
            const productStyle = productAccents[step.productType];

            return (
              <View
                key={step.id}
                className="flex-row items-center gap-4 rounded-[28px] border px-4 py-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.elevated,
                }}
              >
                <View
                  className="h-14 w-14 items-center justify-center rounded-[20px]"
                  style={{ backgroundColor: productStyle.surface }}
                >
                  {step.completed ? (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={productStyle.accent}
                    />
                  ) : (
                    <Ionicons
                      name="add"
                      size={20}
                      color={productStyle.accent}
                    />
                  )}
                </View>

                <View className="flex-1">
                  <Text
                    className="font-sans-semibold text-base"
                    style={{ color: colors.text }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    className="mt-1 font-sans text-sm leading-6"
                    style={{ color: colors.textMuted }}
                  >
                    {step.subtitle}
                  </Text>
                </View>

                <View
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: colors.glass }}
                >
                  <Ionicons name="add" size={18} color={colors.primary} />
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View
        className="overflow-hidden rounded-[34px] border px-5 py-5"
        style={[
          shadows.card,
          { borderColor: colors.border, backgroundColor: colors.panelMuted },
        ]}
      >
        <Text
          className="font-lora text-[32px] leading-9"
          style={{ color: colors.text }}
        >
          {t("calendar.shareTitle")}
        </Text>
        <Text
          className="mt-3 max-w-[280px] font-sans text-[15px] leading-6"
          style={{ color: colors.textMuted }}
        >
          {t("calendar.shareBody")}
        </Text>

        <View className="mt-5 flex-row items-center justify-between gap-4">
          <View className="flex-row">
            {["A", "M", "S"].map((initial, index) => (
              <View
                key={initial}
                className="h-10 w-10 items-center justify-center rounded-full border"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.elevated,
                  marginLeft: index === 0 ? 0 : -12,
                }}
              >
                <Text
                  className="font-sans-semibold text-sm"
                  style={{ color: colors.text }}
                >
                  {initial}
                </Text>
              </View>
            ))}
          </View>

          <View
            className="rounded-full px-4 py-3"
            style={{ backgroundColor: colors.primary }}
          >
            <Text
              className="font-sans-semibold text-sm"
              style={{ color: colors.primaryContrast }}
            >
              {t("calendar.explore")}
            </Text>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
