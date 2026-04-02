import { useEffect, useRef, useState } from "react";
import { Linking, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import {
  CameraView,
  type BarcodeScanningResult,
  type BarcodeType,
  useCameraPermissions,
} from "expo-camera";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import AppScreen from "@/components/layouts/AppScreen";
import NavBar from "@/components/molecules/NavBar";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { useAppTheme } from "@/hooks/use-app-theme";

type ScanPermissionState = "checking" | "requestable" | "blocked" | "granted";
type ScannedBarcode = Pick<BarcodeScanningResult, "data" | "type">;

const SCANNABLE_BARCODE_TYPES: BarcodeType[] = [
  "ean13",
  "ean8",
  "upc_a",
  "upc_e",
  "code128",
  "itf14",
];

function PermissionState({
  title,
  detail,
  actionLabel,
  onPress,
}: {
  title: string;
  detail?: string;
  actionLabel?: string;
  onPress?: () => void;
}) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <AppScreen activeTab="scan" contentClassName="justify-center">
      <View
        className="rounded-[38px] border p-6"
        style={[
          shadows.floating,
          { borderColor: colors.border, backgroundColor: colors.panelSoft },
        ]}
      >
        <View
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.panelMuted }}
        >
          <Ionicons name="scan-outline" size={24} color={colors.primary} />
        </View>

        <Text
          className="mt-6 font-sans-medium text-[11px] uppercase tracking-[2px]"
          style={{ color: colors.primary }}
        >
          {t("nav.scan")}
        </Text>
        <Text
          className="mt-3 font-lora text-[34px] leading-10"
          style={{ color: colors.text }}
        >
          {t("scan.title")}
        </Text>
        <Text
          className="mt-3 font-sans text-base leading-6"
          style={{ color: colors.textMuted }}
        >
          {title}
        </Text>

        {detail ? (
          <Text
            className="mt-4 font-sans text-sm leading-6"
            style={{ color: colors.error }}
          >
            {detail}
          </Text>
        ) : null}

        {actionLabel && onPress ? (
          <View className="mt-6">
            <PrimaryButton title={actionLabel} onPress={onPress} />
          </View>
        ) : null}
      </View>
    </AppScreen>
  );
}

function ScanFrame() {
  const { colors } = useAppTheme();

  return (
    <View className="relative h-72 w-full max-w-xs items-center justify-center">
      <View
        className="h-60 w-60 rounded-[36px] border"
        style={{
          borderColor: colors.scanFrameBorder,
          backgroundColor: colors.scanFrameFill,
        }}
      />
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

function ScanCameraView({
  scannedBarcode,
  onBarcodeScanned,
  onScanAgain,
}: {
  scannedBarcode: ScannedBarcode | null;
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
  onScanAgain: () => void;
}) {
  const { t } = useTranslation();
  const { colors, shadows } = useAppTheme();

  return (
    <View className="flex-1" style={{ backgroundColor: colors.shell }}>
      <CameraView
        className="absolute inset-0"
        barcodeScannerSettings={{ barcodeTypes: SCANNABLE_BARCODE_TYPES }}
        onBarcodeScanned={scannedBarcode ? undefined : onBarcodeScanned}
      />

      <View
        className="absolute inset-0"
        style={{ backgroundColor: colors.cameraOverlay }}
      />

      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="flex-1 px-5 pt-4">
          <View
            className="overflow-hidden rounded-[34px] border"
            style={{
              borderColor: colors.borderSoft,
              backgroundColor: colors.scanGlass,
            }}
          >
            <BlurView
              intensity={28}
              tint={colors.blurTint}
              className="absolute inset-0"
            />

            <View className="px-5 py-5">
              <Text
                className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                style={{ color: colors.textOnDark }}
              >
                {t("nav.scan")}
              </Text>
              <Text
                className="mt-3 font-lora text-[34px] leading-10"
                style={{ color: colors.textOnDark }}
              >
                {t("scan.title")}
              </Text>
              <Text
                className="mt-3 max-w-[290px] font-sans text-base leading-6"
                style={{ color: colors.textOnDark }}
              >
                {t("scan.subtitle")}
              </Text>
            </View>
          </View>

          <View className="flex-1 items-center justify-center">
            {!scannedBarcode ? (
              <>
                <ScanFrame />
                <View
                  className="mt-3 rounded-full px-4 py-3"
                  style={{ backgroundColor: colors.scanHintBackground }}
                >
                  <Text
                    className="font-sans-medium text-sm"
                    style={{ color: colors.textOnDark }}
                  >
                    {t("scan.placeBarcode")}
                  </Text>
                </View>
              </>
            ) : null}
          </View>

          <View
            className="mb-28 overflow-hidden rounded-[34px] border p-5"
            style={[
              shadows.card,
              { borderColor: colors.border, backgroundColor: colors.panel },
            ]}
          >
            {scannedBarcode ? (
              <>
                <Text
                  className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                  style={{ color: colors.primary }}
                >
                  {t("scan.scannedCode")}
                </Text>
                <Text
                  className="mt-3 font-lora text-[30px] leading-8"
                  style={{ color: colors.text }}
                >
                  {scannedBarcode.data}
                </Text>
                <Text
                  className="mt-2 font-sans text-sm"
                  style={{ color: colors.textMuted }}
                >
                  {scannedBarcode.type}
                </Text>

                <View className="mt-5">
                  <PrimaryButton
                    title={t("scan.scanAgain")}
                    onPress={onScanAgain}
                  />
                </View>
              </>
            ) : (
              <>
                <Text
                  className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                  style={{ color: colors.primary }}
                >
                  {t("scan.readyEyebrow")}
                </Text>
                <Text
                  className="mt-3 font-lora text-[30px] leading-8"
                  style={{ color: colors.text }}
                >
                  {t("scan.readyTitle")}
                </Text>
                <Text
                  className="mt-3 font-sans text-[15px] leading-6"
                  style={{ color: colors.textMuted }}
                >
                  {t("scan.readyBody")}
                </Text>

                <View
                  className="mt-4 rounded-[24px] px-4 py-4"
                  style={{ backgroundColor: colors.panelSoft }}
                >
                  <Text
                    className="font-sans-medium text-[11px] uppercase tracking-[2px]"
                    style={{ color: colors.primary }}
                  >
                    {t("scan.tipEyebrow")}
                  </Text>
                  <Text
                    className="mt-2 font-sans text-sm leading-6"
                    style={{ color: colors.textMuted }}
                  >
                    {t("scan.lightTip")}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>

      <NavBar activeTab="scan" />
    </View>
  );
}

function getPermissionState(
  permission: ReturnType<typeof useCameraPermissions>[0],
): ScanPermissionState {
  if (!permission) {
    return "checking";
  }

  if (permission.granted) {
    return "granted";
  }

  return permission.canAskAgain ? "requestable" : "blocked";
}

export default function ScanPage() {
  const { t } = useTranslation();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedBarcode, setScannedBarcode] = useState<ScannedBarcode | null>(
    null,
  );
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const scanLockedRef = useRef(false);
  const permissionState = getPermissionState(permission);
  const canOpenSettings = Platform.OS !== "web";

  useEffect(() => {
    if (permission?.status === "undetermined") {
      void requestPermission();
    }
  }, [permission?.status, requestPermission]);

  const handleRequestPermission = () => {
    setSettingsError(null);
    void requestPermission();
  };

  const handleOpenSettings = async () => {
    setSettingsError(null);

    if (!canOpenSettings) {
      setSettingsError(t("scan.settingsUnavailable"));
      return;
    }

    try {
      await Linking.openSettings();
    } catch {
      setSettingsError(t("scan.settingsUnavailable"));
    }
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (scanLockedRef.current) {
      return;
    }

    const data = result.data?.trim();

    if (!data) {
      return;
    }

    scanLockedRef.current = true;
    setScannedBarcode({
      data,
      type: result.type,
    });
  };

  const handleScanAgain = () => {
    scanLockedRef.current = false;
    setScannedBarcode(null);
  };

  switch (permissionState) {
    case "checking":
      return <PermissionState title={t("scan.checkingPermission")} />;

    case "requestable":
      return (
        <PermissionState
          title={t("scan.permissionRequired")}
          actionLabel={t("scan.allowCameraAccess")}
          onPress={handleRequestPermission}
        />
      );

    case "blocked":
      return (
        <PermissionState
          title={t("scan.permissionBlocked")}
          detail={settingsError ?? undefined}
          actionLabel={canOpenSettings ? t("scan.openSettings") : undefined}
          onPress={
            canOpenSettings ? () => void handleOpenSettings() : undefined
          }
        />
      );

    case "granted":
      return (
        <ScanCameraView
          scannedBarcode={scannedBarcode}
          onBarcodeScanned={handleBarcodeScanned}
          onScanAgain={handleScanAgain}
        />
      );

    default:
      return <PermissionState title={t("scan.checkingPermission")} />;
  }
}
