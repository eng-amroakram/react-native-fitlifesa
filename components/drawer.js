import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native-ui-lib";

//pages
import Index from "../app/index";
import About from "../app/settings/about";
import Profile from "../app/settings/profile";

import materialTheme from "../constants/Theme";
import Home from "../app/home";
import translate from "../lang/localizer";
import drawerStyle from "../assets/styles/drawer";
import { useSelector } from "react-redux";
import Login from "../app/auth/login";
import Register from "../app/auth/register";
import IntroVideo from "../app/auth/intro";
import Verify from "../app/auth/verify";
import Questions from "../app/questionnaire/questions";
import Results from "../app/questionnaire/results";
import BodyIOS from "../app/questionnaire/BodyIOS";

const DrawerContent = () => {
  //Redux
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);

  const drawerStyles = drawerStyle(lang);

  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("index"); // Initial active screen is 'index'

  // Update the active screen based on navigation events
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const currentRoute = navigation.getCurrentRoute().name;
      setActiveScreen(currentRoute);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={drawerStyles.container}>
      <View style={drawerStyles.header}>
        {/* Background Image */}
        <Image
          source={require("../assets/images/on-boarding.png")}
          resizeMode="cover"
          style={drawerStyles.backgroundImage}
        />

        {/* User Info */}
        <View style={drawerStyles.userContainer}>
          {lang == "en" ? (
            <View style={drawerStyles.userImageContainer}>
              {/* Rounded User Image */}
              <Image
                source={require("../assets/images/man.png")}
                style={drawerStyles.userImage}
              />
            </View>
          ) : null}

          <View style={drawerStyles.userInfo}>
            {/* User Name */}
            <Text style={drawerStyles.userName}>{auth?.user?.name}</Text>

            {/* User Email */}
            <Text style={drawerStyles.userEmail}>{auth?.user?.email}</Text>
          </View>

          {lang == "ar" ? (
            <View style={drawerStyles.userImageContainer}>
              {/* Rounded User Image */}
              <Image
                source={require("../assets/images/man.png")}
                style={drawerStyles.userImage}
              />
            </View>
          ) : null}
        </View>
      </View>
      {/* Drawer Items */}
      <View style={drawerStyles.body}>
        <Button
          style={
            activeScreen === "home"
              ? drawerStyles.item
              : drawerStyles.itemInActive
          }
          label={translate("Home", lang)}
          backgroundColor={materialTheme.colors.success}
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo("home"));
          }}
        />

        <Button
          style={
            activeScreen === "questionnaire/BodyIOS"
              ? drawerStyles.item
              : drawerStyles.itemInActive
          }
          label={translate("Health Details", lang)}
          backgroundColor={materialTheme.colors.info}
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo("questionnaire/BodyIOS"));
          }}
        />

        <Button
          style={
            activeScreen === "questionnaire/results"
              ? drawerStyles.item
              : drawerStyles.itemInActive
          }
          label={translate("Your Body Info", lang)}
          backgroundColor={materialTheme.colors.info}
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo("questionnaire/results"));
          }}
        />
      </View>

      {/* Footer Section */}
      <View style={drawerStyles.footer}>
        <Button
          label={translate("Logout", lang)}
          style={drawerStyles.itemError} // Apply the appropriate styling for the "Logout" button
          onPress={() => {
            navigation.dispatch(DrawerActions.jumpTo("index"));
          }}
        />
      </View>
    </View>
  );
};

const DrawerNavigator = createDrawerNavigator();

const Drawer = () => {
  //Redux
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);

  const drawerStyles = drawerStyle(lang);

  return (
    <DrawerNavigator.Navigator
      initialRouteName="index"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerPosition: lang == "ar" ? "right" : "left",
      }}
    >
      <DrawerNavigator.Screen
        name="index"
        options={drawerStyles.indexDrawerScreen}
        component={Index}
      />

      <DrawerNavigator.Screen
        name="home"
        options={drawerStyles.homeDrawerScreen}
        component={Home}
      />

      <DrawerNavigator.Screen
        name="settings/profile"
        options={drawerStyles.profileDrawerScreen}
        component={Profile}
      />

      <DrawerNavigator.Screen
        name="settings/about"
        options={drawerStyles.aboutDrawerScreen}
        component={About}
      />

      {/* //Auth */}
      <DrawerNavigator.Screen
        name="auth/login"
        options={drawerStyles.loginDrawerScreen}
        component={Login}
      />

      <DrawerNavigator.Screen
        name="auth/register"
        options={drawerStyles.registerDrawerScreen}
        component={Register}
      />

      <DrawerNavigator.Screen
        name="auth/intro"
        options={drawerStyles.introVideoDrawerScreen}
        component={IntroVideo}
      />

      <DrawerNavigator.Screen
        name="auth/verify"
        options={drawerStyles.verifyDrawerScreen}
        component={Verify}
      />

      <DrawerNavigator.Screen
        name="questionnaire/BodyIOS"
        options={drawerStyles.bodyDrawerScreen}
        component={BodyIOS}
      />

      <DrawerNavigator.Screen
        name="questionnaire/questions"
        options={drawerStyles.questionsDrawerScreen}
        component={Questions}
      />

      <DrawerNavigator.Screen
        name="questionnaire/results"
        options={drawerStyles.resultsDrawerScreen}
        component={Results}
      />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
