import RootAppShell from "@/components/layouts/RootAppShell";
import RootLoadingScreen from "@/components/layouts/RootLoadingScreen";
import { useAppBootstrap } from "@/hooks/use-app-bootstrap";
import "@/i18n";
import "@/global.css";

export default function RootLayout() {
  const isReady = useAppBootstrap();

  return isReady ? <RootAppShell /> : <RootLoadingScreen />;
}
