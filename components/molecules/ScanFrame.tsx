import { View } from "react-native";
import { useAppTheme } from "@/hooks/use-app-theme";

export default function ScanFrame() {
  const { colors } = useAppTheme();

  return (
    <View className="relative h-72 w-full max-w-xs items-center justify-center">
      <View
        className="absolute left-8 top-10 h-12 w-12 rounded-tl-[22px] border-l-[3px] border-t-[3px]"
        style={{ borderColor: colors.scanFrameBorder }}
      />
      <View
        className="absolute right-8 top-10 h-12 w-12 rounded-tr-[22px] border-r-[3px] border-t-[3px]"
        style={{ borderColor: colors.scanFrameBorder }}
      />
      <View
        className="absolute bottom-10 left-8 h-12 w-12 rounded-bl-[22px] border-b-[3px] border-l-[3px]"
        style={{ borderColor: colors.scanFrameBorder }}
      />
      <View
        className="absolute bottom-10 right-8 h-12 w-12 rounded-br-[22px] border-b-[3px] border-r-[3px]"
        style={{ borderColor: colors.scanFrameBorder }}
      />
      <View
        className="absolute left-12 right-12 top-1/2 h-px"
        style={{ backgroundColor: colors.scanGuide }}
      />
    </View>
  );
}
