import { calendarRoutineStepsByDay } from "@/constants/mock-content";

export const CALENDAR_STRIP_OFFSETS = [-1, 0, 1] as const;

export type RoutineDayId = keyof typeof calendarRoutineStepsByDay;

export function getCalendarLocale(language: string | undefined): string {
  return language === "fr" ? "fr-FR" : "en-US";
}

export function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function addYears(date: Date, amount: number): Date {
  return new Date(date.getFullYear() + amount, date.getMonth(), 1);
}

export function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function parseLocalDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isSameLocalDay(left: Date, right: Date): boolean {
  return getLocalDateKey(left) === getLocalDateKey(right);
}

export function getRoutineDayId(date: Date): RoutineDayId {
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

export function getProgressLabel(date: Date): string {
  const steps = calendarRoutineStepsByDay[getRoutineDayId(date)];
  const completedCount = steps.filter((step) => step.completed).length;

  return `${completedCount}/${steps.length}`;
}

export function normalizeWeekdayLabel(label: string): string {
  return label.replace(/\./g, "");
}

export function getWeekdayHeaders(
  locale: string,
  weekStartsOn: number,
): string[] {
  const sundayReference = new Date(2024, 0, 7);

  return Array.from({ length: 7 }, (_, index) => {
    const weekdayDate = addDays(sundayReference, (weekStartsOn + index) % 7);

    return normalizeWeekdayLabel(
      new Intl.DateTimeFormat(locale, { weekday: "short" }).format(weekdayDate),
    );
  });
}

export function getMonthCells(
  monthDate: Date,
  weekStartsOn: number,
): (Date | null)[] {
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
