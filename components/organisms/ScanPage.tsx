import { Linking, Pressable, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, type ReactNode } from "react";
import NavBar from "@/components/molecules/NavBar";

type ScanPermissionState = "checking" | "requestable" | "blocked" | "granted";

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
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-center text-sm text-gray-500">{title}</Text>

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

function ScanCameraView() {
  return (
    <ScreenLayout backgroundClassName="bg-black">
      <CameraView className="absolute inset-0" />

      <View className="absolute inset-0 items-center justify-center">
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
          Place the barcode inside the frame
        </Text>
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
