import { View, Text, ScrollView, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RoutineCard from "@/components/atoms/RoutineCard";
import AnswerButton from "@/components/atoms/AnswerButton";
import NavBar from "@/components/molecules/NavBar";
import { useProfile } from "@/hooks/auth/useProfile";

export default function HomePage() {
  const { firstname } = useProfile();
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-6 pt-14"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-lg font-semibold text-slate-900">
            SkinTrack
          </Text>

          <View className="h-9 w-9 rounded-full bg-gray-200" />
        </View>

        <View className="mb-6">
          <Text className="text-base text-slate-800 mb-2">
            Hi {firstname || "Guest"} 👋
          </Text>

          <View className="self-start flex-row items-center px-3 py-1 rounded-full border border-gray-200">
            <Ionicons name="flame-outline" size={14} color="#f97316" />
            <Text className="text-xs text-gray-600 ml-1">
              Streak: 4 days in a row
            </Text>
          </View>
        </View>

        {/* QUESTION CARD */}
        <View className="border border-gray-200 rounded-2xl p-4 mb-6">
          <Text className="text-sm text-slate-800 mb-4">
            Did you apply your skincare tonight?
          </Text>

          <View className="flex-row gap-3">
            <AnswerButton label="Yes" />
            <AnswerButton label="No" />
          </View>
        </View>

        {/* SEARCH */}
        <View className="flex-row items-center border border-gray-200 rounded-xl px-3 py-3 mb-8">
          <Ionicons name="search-outline" size={18} color="#9ca3af" />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            className="ml-2 flex-1 text-sm text-slate-800"
          />
        </View>

        {/* ROUTINE */}
        <Text className="text-base font-semibold text-slate-900 mb-4">
          Your Night Routine
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            <RoutineCard step="Step 1" title="Cleanser" />
            <RoutineCard step="Step 2" title="Serum" />
            <RoutineCard step="Step 3" title="Moisturizer" />
          </View>
        </ScrollView>
      </ScrollView>

      {/* NAVBAR */}
      <NavBar activeTab="home" />
    </View>
  );
}
