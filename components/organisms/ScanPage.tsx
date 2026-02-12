import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect } from "react";
import NavBar from "@/components/molecules/NavBar";

export default function ScanPage() {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission?.granted) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-gray-500 text-sm">
          Camera permission required
        </Text>
      </View>
    );
  }
  const styles = StyleSheet.create({
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

  return (
    <View className="flex-1 bg-black">
      {/* CAMERA */}
      <CameraView style={StyleSheet.absoluteFill} />

      {/* OVERLAY */}
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
        <Text style={styles.hint}>Place the barcode inside the frame</Text>
      </View>

      {/* NAVBAR */}
      <NavBar activeTab="scan" />
    </View>
  );
}
