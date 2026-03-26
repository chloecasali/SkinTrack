import { Linking, Platform, Pressable, Text, View } from "react-native";
import {
  CameraView,
  type BarcodeScanningResult,
  type BarcodeType,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "@/components/molecules/NavBar";

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

function ScreenLayout({
  children,
  backgroundClassName = "bg-white",
}: {
  children: ReactNode;
  backgroundClassName?: string;
}) {
  return (
    <View className={`flex-1 ${backgroundClassName}`}>
      {children}
      <NavBar activeTab="scan" />
    </View>
  );
}

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
  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-sm text-gray-500">{title}</Text>
        {detail ? (
          <Text className="mt-3 text-center text-sm text-red-500">
            {detail}
          </Text>
        ) : null}

        {actionLabel && onPress && (
          <Pressable
            onPress={onPress}
            className="mt-4 rounded-xl bg-slate-900 px-5 py-3"
            style={({ pressed }) => (pressed ? { opacity: 0.75 } : undefined)}
          >
            <Text className="text-sm font-medium text-white">
              {actionLabel}
            </Text>
          </Pressable>
        )}
      </View>
    </ScreenLayout>
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

  return (
    <ScreenLayout backgroundClassName="bg-black">
      <CameraView
        className="absolute inset-0"
        barcodeScannerSettings={{ barcodeTypes: SCANNABLE_BARCODE_TYPES }}
        onBarcodeScanned={scannedBarcode ? undefined : onBarcodeScanned}
      />

      <View className="absolute inset-0 items-center justify-center">
        {scannedBarcode ? (
          <View className="mx-6 w-full max-w-sm rounded-2xl bg-white/95 px-5 py-5">
            <Text className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {t("scan.scannedCode")}
            </Text>
            <Text className="mt-2 text-base font-semibold text-slate-900">
              {scannedBarcode.data}
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              {scannedBarcode.type}
            </Text>

            <Pressable
              onPress={onScanAgain}
              className="mt-4 rounded-xl bg-slate-900 px-5 py-3"
              style={({ pressed }) => (pressed ? { opacity: 0.75 } : undefined)}
            >
              <Text className="text-center text-sm font-medium text-white">
                {t("scan.scanAgain")}
              </Text>
            </Pressable>
          </View>
        ) : (
          <>
            <View
              className="rounded-xl"
              style={{
                width: 260,
                height: 160,
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            />
            <Text className="mt-6 text-sm text-gray-200">
              {t("scan.placeBarcode")}
            </Text>
          </>
        )}
      </View>
    </ScreenLayout>
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
