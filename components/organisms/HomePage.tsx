import { View, Text, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import RoutineCard from "@/components/atoms/RoutineCard";
import AnswerButton from "@/components/atoms/AnswerButton";
import NavBar from "@/components/molecules/NavBar";
import { useProfile } from "@/hooks/auth/useProfile";

export default function HomePage() {
  const { firstname } = useProfile();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-6 pt-14"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-lg font-semibold text-slate-900">
            {t("home.title")}
          </Text>

          <View className="h-9 w-9 rounded-full bg-gray-200" />
        </View>

        <View className="mb-6">
          <Text className="text-base text-slate-800 mb-2">
            {t("home.greeting", { name: firstname || t("home.guest") })}
          </Text>

          <View className="self-start flex-row items-center px-3 py-1 rounded-full border border-gray-200">
            <Ionicons name="flame-outline" size={14} color="#f97316" />
            <Text className="text-xs text-gray-600 ml-1">
              {t("home.streak", { count: 4 })}
            </Text>
          </View>
        </View>

        <View className="border border-gray-200 rounded-2xl p-4 mb-6">
          <Text className="text-sm text-slate-800 mb-4">
            {t("home.question")}
          </Text>

          <View className="flex-row gap-3">
            <AnswerButton label={t("home.yes")} />
            <AnswerButton label={t("home.no")} />
          </View>
        </View>

        <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-3 mb-8">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder={t("home.searchPlaceholder")}
            placeholderTextColor="#9ca3af"
            className="ml-2 flex-1 text-sm text-slate-800"
          />
        </View>

        <Text className="text-base font-semibold text-slate-900 mb-4">
          {t("home.routineTitle")}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            <RoutineCard
              step={t("home.steps.one")}
              title={t("home.routine.cleanser")}
              brandName={t("home.routine.brandName")}
            />
            <RoutineCard
              step={t("home.steps.two")}
              title={t("home.routine.serum")}
              brandName={t("home.routine.brandName")}
            />
            <RoutineCard
              step={t("home.steps.three")}
              title={t("home.routine.moisturizer")}
              brandName={t("home.routine.brandName")}
            />
          </View>
        </ScrollView>
      </ScrollView>

      <NavBar activeTab="home" />
    </View>
  );
}
