import GradientBG from "@/components/GradientBG";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider store={store}>
          <GradientBG />
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar barStyle={"light-content"} />
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
