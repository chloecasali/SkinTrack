import { useMemo, useState } from "react";
import { calendarRoutineStepsByDay } from "@/constants/mock-content";
import { useAppLanguage } from "@/services/language";
import {
  addDays,
  addMonths,
  addYears,
  CALENDAR_STRIP_OFFSETS,
  getCalendarLocale,
  getLocalDateKey,
  getMonthCells,
  getProgressLabel,
  getRoutineDayId,
  getWeekdayHeaders,
  isSameLocalDay,
  normalizeWeekdayLabel,
  parseLocalDateKey,
  startOfLocalDay,
  startOfMonth,
} from "@/utils/calendar";

export function useCalendarState() {
  const language = useAppLanguage();
  const locale = useMemo(() => getCalendarLocale(language), [language]);
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

  const showPreviousYear = () => {
    setVisibleMonthDate((currentDate) => addYears(currentDate, -1));
  };

  const showPreviousMonth = () => {
    setVisibleMonthDate((currentDate) => addMonths(currentDate, -1));
  };

  const showNextMonth = () => {
    setVisibleMonthDate((currentDate) => addMonths(currentDate, 1));
  };

  const showNextYear = () => {
    setVisibleMonthDate((currentDate) => addYears(currentDate, 1));
  };

  return {
    calendarVisible,
    closeCalendar,
    completedCount,
    handleDateSelection,
    headerTitle,
    monthCells,
    openCalendar,
    selectedDateKey,
    setSelectedDateKey,
    showNextMonth,
    showNextYear,
    showPreviousMonth,
    showPreviousYear,
    steps,
    stripItems,
    todayKey,
    visibleMonthDate,
    visibleMonthLabel,
    visibleMonthName,
    weekdayHeaders,
  };
}

export type CalendarStripItem = ReturnType<
  typeof useCalendarState
>["stripItems"][number];
