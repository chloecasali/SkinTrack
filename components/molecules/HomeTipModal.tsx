import { Modal, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useAppTheme } from "@/hooks/use-app-theme";

type HomeTipModalProps = {
  visible: boolean;
  onDismiss: () => void;
  eyebrow: string;
  title: string;
  body: string;
  dismissLabel: string;
};

export default function HomeTipModal({
  visible,
  onDismiss,
  eyebrow,
  title,
  body,
  dismissLabel,
}: HomeTipModalProps) {
  const { colors, accents, shadows } = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: colors.overlay }}
      >
        <Pressable className="absolute inset-0" onPress={onDismiss} />

        <View
          className="w-full overflow-hidden rounded-[38px] border px-6 py-8"
          style={{
            ...shadows.floating,
            maxWidth: 340,
            borderColor: colors.border,
            backgroundColor: colors.glassStrong,
          }}
        >
          <View className="flex-row items-center gap-4">
            <View
              className="h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: accents.mint.surface }}
            >
              <Ionicons
                name="leaf-outline"
                size={28}
                color={accents.mint.accent}
              />
            </View>

            <View className="flex-1">
              <Text
                className="font-sans-semibold text-[13px] uppercase tracking-[2px]"
                style={{ color: colors.primary }}
              >
                {eyebrow}
              </Text>
              <Text
                className="mt-3 font-lora text-[32px] leading-9"
                style={{ color: colors.text }}
              >
                {title}
              </Text>
            </View>
          </View>

          <Text
            className="mt-5 font-sans text-base leading-7"
            style={{ color: colors.textMuted }}
          >
            {body}
          </Text>

          <View className="mt-8">
            <PrimaryButton
              title={dismissLabel}
              onPress={onDismiss}
              variant="soft"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
