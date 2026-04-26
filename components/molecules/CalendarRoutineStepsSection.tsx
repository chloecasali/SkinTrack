import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import type { CalendarRoutineStep } from "@/constants/mock-content";
import { useAppTheme } from "@/hooks/use-app-theme";

type CalendarRoutineStepsSectionProps = {
  completedCount: number;
  steps: CalendarRoutineStep[];
};

export default function CalendarRoutineStepsSection({
  completedCount,
  steps,
}: CalendarRoutineStepsSectionProps) {
  const { t } = useTranslation();
  const { colors, productAccents, shadows } = useAppTheme();

  return (
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
                  <Ionicons name="add" size={20} color={productStyle.accent} />
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
  );
}
