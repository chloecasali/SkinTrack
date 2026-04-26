import { Text, View } from "react-native";
import PreferenceOptionButton from "@/components/atoms/PreferenceOptionButton";
import { useAppTheme } from "@/hooks/use-app-theme";

type ProfilePreferenceSelectorProps<T extends string> = {
  activeValue: T;
  backgroundColor: string;
  subtitle: string;
  title: string;
  options: readonly T[];
  optionsGapClassName?: string;
  optionClassName?: string;
  textClassName: string;
  getLabel: (option: T) => string;
  onSelect: (option: T) => void;
};

export default function ProfilePreferenceSelector<T extends string>({
  activeValue,
  backgroundColor,
  subtitle,
  title,
  options,
  optionsGapClassName = "gap-3",
  optionClassName,
  textClassName,
  getLabel,
  onSelect,
}: ProfilePreferenceSelectorProps<T>) {
  const { colors } = useAppTheme();

  return (
    <View className="rounded-[30px] px-4 py-4" style={{ backgroundColor }}>
      <Text
        className="font-sans-medium text-[11px] uppercase tracking-[2px]"
        style={{ color: colors.primary }}
      >
        {title}
      </Text>
      <Text
        className="mt-2 font-sans text-sm leading-6"
        style={{ color: colors.textMuted }}
      >
        {subtitle}
      </Text>

      <View className={`mt-4 flex-row ${optionsGapClassName}`}>
        {options.map((option) => (
          <PreferenceOptionButton
            key={option}
            active={activeValue === option}
            label={getLabel(option)}
            pressableClassName={optionClassName}
            textClassName={textClassName}
            onPress={() => onSelect(option)}
          />
        ))}
      </View>
    </View>
  );
}
