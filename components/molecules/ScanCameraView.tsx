import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, type BarcodeScanningResult } from "expo-camera";
import { useTranslation } from "react-i18next";
import NavBar from "@/components/molecules/NavBar";
import ScanFrame from "@/components/molecules/ScanFrame";
import { SCANNABLE_BARCODE_TYPES } from "@/constants/scan";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { ScannedBarcode } from "@/types/scan";

type ScanCameraViewProps = {
  scannedBarcode: ScannedBarcode | null;
  onBarcodeScanned: (result: BarcodeScanningResult) => void;
  onScanAgain: () => void;
};

export default function ScanCameraView({
  scannedBarcode,
  onBarcodeScanned,
}: ScanCameraViewProps) {
  const { t } = useTranslation();
  const { colors } = useAppTheme();

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
                    style={{ color: colors.textOnOverlay }}
                  >
                    {t("scan.placeBarcode")}
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </SafeAreaView>

      <NavBar activeTab="scan" />
    </View>
  );
}
