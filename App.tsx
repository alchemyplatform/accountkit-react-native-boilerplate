import React, { useEffect } from "react";
import { LogBox, StatusBar, useColorScheme } from "react-native";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
/**
 * ? Local Imports
 */
import { isAndroid } from "@freakycoder/react-native-helpers";
import { useMagicSigner } from "@hooks/useMagicSigner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./src/navigation";

LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  const { magic } = useMagicSigner();

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <SafeAreaProvider>
      <magic.Relayer />
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
