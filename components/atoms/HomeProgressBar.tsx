import { View } from "react-native";

type HomeProgressBarProps = {
  progressPercent: number;
  trackColor: string;
  fillColor: string;
};

function clampProgressPercent(progressPercent: number): number {
  return Math.min(Math.max(progressPercent, 0), 100);
}

export default function HomeProgressBar({
  progressPercent,
  trackColor,
  fillColor,
}: HomeProgressBarProps) {
  const clampedProgressPercent = clampProgressPercent(progressPercent);

  return (
    <View
      className="h-3 flex-1 overflow-hidden rounded-full"
      style={{ backgroundColor: trackColor }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${clampedProgressPercent}%`,
          backgroundColor: fillColor,
        }}
      />
    </View>
  );
}
