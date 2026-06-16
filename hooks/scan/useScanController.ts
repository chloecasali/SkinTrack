import { useEffect, useRef, useState } from "react";
import { Linking, Platform } from "react-native";
import { type BarcodeScanningResult, useCameraPermissions } from "expo-camera";
import { useTranslation } from "react-i18next";
import type { ScannedBarcode, ScanPermissionState } from "@/types/scan";

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

export function useScanController() {
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

  return {
    canOpenSettings,
    handleBarcodeScanned,
    handleOpenSettings,
    handleRequestPermission,
    handleScanAgain,
    permissionState,
    scannedBarcode,
    settingsError,
  };
}
