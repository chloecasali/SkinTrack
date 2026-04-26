// import { useTranslation } from "react-i18next";
// import ScanCameraView from "@/components/molecules/ScanCameraView";
// import ScanPermissionCard from "@/components/molecules/ScanPermissionCard";
// import { useScanController } from "@/hooks/scan/useScanController";
//
// export default function ScanPage() {
//   const { t } = useTranslation();
//   const scan = useScanController();
//
//   switch (scan.permissionState) {
//     case "checking":
//       return <ScanPermissionCard title={t("scan.checkingPermission")} />;
//
//     case "requestable":
//       return (
//         <ScanPermissionCard
//           title={t("scan.permissionRequired")}
//           actionLabel={t("scan.allowCameraAccess")}
//           onPress={scan.handleRequestPermission}
//         />
//       );
//
//     case "blocked":
//       return (
//         <ScanPermissionCard
//           title={t("scan.permissionBlocked")}
//           detail={scan.settingsError ?? undefined}
//           actionLabel={
//             scan.canOpenSettings ? t("scan.openSettings") : undefined
//           }
//           onPress={
//             scan.canOpenSettings
//               ? () => void scan.handleOpenSettings()
//               : undefined
//           }
//         />
//       );
//
//     case "granted":
//       return (
//         <ScanCameraView
//           scannedBarcode={scan.scannedBarcode}
//           onBarcodeScanned={scan.handleBarcodeScanned}
//           onScanAgain={scan.handleScanAgain}
//         />
//       );
//
//     default:
//       return <ScanPermissionCard title={t("scan.checkingPermission")} />;
//   }
// }
