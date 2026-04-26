import { ScrollView, View } from "react-native";
import NavBar from "@/components/molecules/NavBar";
import CalendarHeroCard from "@/components/molecules/CalendarHeroCard";
import CalendarMonthModal from "@/components/molecules/CalendarMonthModal";
import CalendarRoutineStepsSection from "@/components/molecules/CalendarRoutineStepsSection";
import CalendarShareCard from "@/components/molecules/CalendarShareCard";
import { useCalendarState } from "@/hooks/calendar/useCalendarState";
import { useAppTheme } from "@/hooks/use-app-theme";

export function CalendarPage() {
  const calendar = useCalendarState();
  const { colors } = useAppTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.shell }}>
      <ScrollView
        className="flex-1 px-6 pt-14"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          <CalendarMonthModal
            visible={calendar.calendarVisible}
            monthCells={calendar.monthCells}
            selectedDateKey={calendar.selectedDateKey}
            todayKey={calendar.todayKey}
            visibleMonthDate={calendar.visibleMonthDate}
            visibleMonthLabel={calendar.visibleMonthLabel}
            visibleMonthName={calendar.visibleMonthName}
            weekdayHeaders={calendar.weekdayHeaders}
            onClose={calendar.closeCalendar}
            onDateSelection={calendar.handleDateSelection}
            onNextMonth={calendar.showNextMonth}
            onNextYear={calendar.showNextYear}
            onPreviousMonth={calendar.showPreviousMonth}
            onPreviousYear={calendar.showPreviousYear}
          />

          <CalendarHeroCard
            headerTitle={calendar.headerTitle}
            selectedDateKey={calendar.selectedDateKey}
            stripItems={calendar.stripItems}
            onOpenCalendar={calendar.openCalendar}
            onSelectDate={calendar.setSelectedDateKey}
          />

          <CalendarRoutineStepsSection
            completedCount={calendar.completedCount}
            steps={calendar.steps}
          />

          <CalendarShareCard />
        </View>
      </ScrollView>

      <NavBar activeTab="calendar" />
    </View>
  );
}

export default CalendarPage;
