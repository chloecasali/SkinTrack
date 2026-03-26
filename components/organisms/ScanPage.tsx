import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, type ReactNode } from "react";
import NavBar from "@/components/molecules/NavBar";

type ScanPermissionState =
  | "checking"
  | "requestable"
  | "blocked"
  | "granted";

const styles = StyleSheet.create({
  permissionContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ffffff",
  },
  permissionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6b7280",
  },
  permissionButton: {
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: "#0f172a",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  scanArea: {
    width: 260,
    height: 160,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  hint: {
    marginTop: 24,
    color: "#e5e7eb",
    fontSize: 14,
  },
});

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
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) {
  return (
    <ScreenLayout>
      <View style={styles.permissionContent}>
        <Text style={styles.permissionText}>{title}</Text>

        {actionLabel && onPress && (
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.permissionButton,
              pressed && { opacity: 0.75 },
            ]}
          >
            <Text style={styles.permissionButtonText}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
    </ScreenLayout>
  );
}

function ScanCameraView() {
  return (
    <ScreenLayout backgroundClassName="bg-black">
      <CameraView style={StyleSheet.absoluteFill} />

      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.hint}>Place the barcode inside the frame</Text>
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
  const [permission, requestPermission] = useCameraPermissions();
  const permissionState = getPermissionState(permission);

  useEffect(() => {
    if (permission?.status === "undetermined") {
      void requestPermission();
    }
  }, [permission?.status, requestPermission]);

  const handleRequestPermission = () => {
    void requestPermission();
  };

  const handleOpenSettings = () => {
    void Linking.openSettings();
  };

  switch (permissionState) {
    case "checking":
      return <PermissionState title="Checking camera permission..." />;

    case "requestable":
      return (
        <PermissionState
          title="Camera permission is required to scan a barcode."
          actionLabel="Allow camera access"
          onPress={handleRequestPermission}
        />
      );

    case "blocked":
      return (
        <PermissionState
          title="Camera access is disabled. Enable it in Settings to scan a barcode."
          actionLabel="Open Settings"
          onPress={handleOpenSettings}
        />
      );

    case "granted":
      return <ScanCameraView />;

    default:
      return <PermissionState title="Checking camera permission..." />;
  }
}
