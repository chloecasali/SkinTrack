import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AppScreen from "@/components/layouts/AppScreen";
import SectionHeader from "@/components/atoms/SectionHeader";
import {
  calendarDays,
  calendarRoutineStepsByDay,
} from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function CalendarScreen() {
  const { t } = useTranslation();
  const { colors, shadows, accents } = useAppTheme();
  const [selectedDayId, setSelectedDayId] = useState("tue");

  const selectedDay =
    calendarDays.find((day) => day.id === selectedDayId) ?? calendarDays[0];
  const steps = useMemo(
    () => calendarRoutineStepsByDay[selectedDay.id],
    [selectedDay.id],
  );
  const completedCount = steps.filter((step) => step.completed).length;

  return (
    <AppScreen activeTab="calendar" scroll contentClassName="gap-6">
      <View
        className="overflow-hidden rounded-[40px] border px-5 py-5"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panelSoft },
        ]}
      >
        <View
          className="absolute -right-8 -top-5 h-36 w-36 rounded-full"
          style={{ backgroundColor: colors.accentLilac }}
        />

        <SectionHeader
          eyebrow={t("nav.calendar")}
          title={t("calendar.todayTitle")}
          description={t("calendar.todaySubtitle")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          className="mt-1"
        >
          <View className="flex-row gap-3">
            {calendarDays.map((day) => {
              const active = day.id === selectedDay.id;

              return (
                <Pressable
                  key={day.id}
                  onPress={() => setSelectedDayId(day.id)}
                  className="w-[78px] rounded-[26px] border px-3 py-4"
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.82 : 1,
                    borderColor: active ? colors.borderStrong : colors.border,
                    backgroundColor: active ? colors.elevated : colors.glass,
                  })}
                >
                  <Text
                    className={`text-center ${active ? "font-lora text-[28px]" : "font-lora text-[24px]"}`}
                    style={{ color: active ? colors.text : colors.textMuted }}
                  >
                    {day.dayNumber}
                  </Text>
                  <Text
                    className="mt-1 text-center font-sans text-sm"
                    style={{ color: colors.textMuted }}
                  >
                    {t(`calendar.weekdays.${day.id}`)}
                  </Text>
                  <Text
                    className="mt-3 text-center font-sans-medium text-[11px] uppercase tracking-[1.8px]"
                    style={{ color: colors.primary }}
                  >
                    {day.progressLabel}
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
            const toneStyle = accents[step.tone];

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
                  style={{ backgroundColor: toneStyle.surface }}
                >
                  {step.completed ? (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={toneStyle.accent}
                    />
                  ) : (
                    <Ionicons name="add" size={20} color={toneStyle.accent} />
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
        <View
          className="absolute -right-8 bottom-0 h-28 w-28 rounded-full"
          style={{ backgroundColor: colors.accentLilac }}
        />
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
