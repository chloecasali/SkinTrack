import { View } from "react-native";

type HomeProgressBarProps = {
  progressPercent: number;
  trackColor: string;
  fillColor: string;
};

export default function HomeProgressBar({
  progressPercent,
  trackColor,
  fillColor,
}: HomeProgressBarProps) {
  return (
    <View
      className="h-3 flex-1 overflow-hidden rounded-full"
      style={{ backgroundColor: trackColor }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${progressPercent}%`,
          backgroundColor: fillColor,
        }}
      />
    </View>
  );
}
