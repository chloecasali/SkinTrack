// import AppScreen from "@/components/layouts/AppScreen";
// import CalendarHeroCard from "@/components/molecules/CalendarHeroCard";
// import CalendarMonthModal from "@/components/molecules/CalendarMonthModal";
// import CalendarRoutineStepsSection from "@/components/molecules/CalendarRoutineStepsSection";
// import CalendarShareCard from "@/components/molecules/CalendarShareCard";
// import { useCalendarState } from "@/hooks/calendar/useCalendarState";
//
// export default function CalendarPage() {
//   const calendar = useCalendarState();
//
//   return (
//       <AppScreen activeTab="calendar" scroll contentClassName="gap-6">
//         <CalendarMonthModal
//             visible={calendar.calendarVisible}
//             monthCells={calendar.monthCells}
//             selectedDateKey={calendar.selectedDateKey}
//             todayKey={calendar.todayKey}
//             visibleMonthDate={calendar.visibleMonthDate}
//             visibleMonthLabel={calendar.visibleMonthLabel}
//             visibleMonthName={calendar.visibleMonthName}
//             weekdayHeaders={calendar.weekdayHeaders}
//             onClose={calendar.closeCalendar}
//             onDateSelection={calendar.handleDateSelection}
//             onNextMonth={calendar.showNextMonth}
//             onNextYear={calendar.showNextYear}
//             onPreviousMonth={calendar.showPreviousMonth}
//             onPreviousYear={calendar.showPreviousYear}
//         />
//
//         <CalendarHeroCard
//             headerTitle={calendar.headerTitle}
//             selectedDateKey={calendar.selectedDateKey}
//             stripItems={calendar.stripItems}
//             onOpenCalendar={calendar.openCalendar}
//             onSelectDate={calendar.setSelectedDateKey}
//         />
//
//         <CalendarRoutineStepsSection
//             completedCount={calendar.completedCount}
//             steps={calendar.steps}
//         />
//
//         <CalendarShareCard />
//       </AppScreen>
//   );
// }
