import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "../redux/store";

//Fonts
import { useFonts } from "expo-font";
import RobotoFont from "../assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoBold from "../assets/fonts/Roboto/Roboto-Bold.ttf";
import RobotoItalic from "../assets/fonts/Roboto/Roboto-Italic.ttf";
import CairoRegular from "../assets/fonts/Cairo/Cairo-Regular.ttf";
import * as SplashScreen from "expo-splash-screen";
import Stacks from "../components/stacks";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  //Fonts
  const [loaded] = useFonts({
    Roboto: RobotoFont,
    RobotoBold: RobotoBold,
    RobotoItalic: RobotoItalic,
    Cairo: CairoRegular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stacks />
      </SafeAreaView>
    </Provider>
  );
};

export default Layout;
