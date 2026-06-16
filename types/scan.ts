import type { BarcodeScanningResult } from "expo-camera";

export type ScanPermissionState =
  | "checking"
  | "requestable"
  | "blocked"
  | "granted";

export type ScannedBarcode = Pick<BarcodeScanningResult, "data" | "type">;
