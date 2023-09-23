import { Stack, useRouter } from "expo-router";
import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLang } from "../redux/slices/lang";
import getNavigator from "../services/navigators";
import storage from "../services/storage";
import { ExpandableOverlay } from "react-native-ui-lib/src/incubator";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Chip, Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { userApiImage } from "../constants/Images";
import translate from "../lang/localizer";
import materialTheme from "../constants/Theme";
import { RootSiblingParent } from "react-native-root-siblings";
import { setUser } from "../redux/slices/auth";
import { Icon } from "galio-framework";
import ToastMessage from "../constants/Toaster";

const { height, width } = Dimensions.get("screen");

const backToHome = () => {
  const router = useRouter();
  const lang = useSelector((state) => state.lang.lang);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(getNavigator("home"));
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 15,
        }}
      >
        <Icon
          name="left"
          family="AntDesign"
          size={20}
          color={materialTheme.colors.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

const leftHeaderImage = (lang) => {
  const expandableOverlayHeaderRightRef = createRef();
  const expandableOverlaySettingsRef = createRef();
  const auth = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const changeLang = async () => {
    let lang = await storage.get("lang");
    let changeLang = lang == "ar" ? "en" : "ar";

    dispatch(setLang(changeLang));
    await storage.set("lang", changeLang);
    router.push(getNavigator("home"));
  };

  const logout = async () => {
    expandableOverlayHeaderRightRef.current?.closeExpandable();
    await storage.remove("token");
    await storage.remove("user");
    await storage.set("lang", "en");

    dispatch(setLang("en"));
    dispatch(setUser(null));

    router.push(getNavigator("login"));
  };

  return (
    <ExpandableOverlay
      ref={expandableOverlayHeaderRightRef}
      useDialog
      onPress={() => {
        console.log("Open Dialog Menu");
      }}
      dialogProps={{
        width: width,
        bottom: true,
        containerStyle: {
          width: width * 1,
          height: height * 0.8,
          backgroundColor: materialTheme.colors.primary,
          borderRadius: 20,
        },
      }}
      expandableContent={
        <ScrollView>
          <View
            style={{
              width: width,
              height: height * 1.1,
              backgroundColor: materialTheme.colors.primary,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
          >
            <View
              style={{
                backgroundColor: materialTheme.colors.primary,
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,

                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: materialTheme.colors.primary,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {translate("Close", lang)}
              </Text>

              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {translate("Account", lang)}
              </Text>

              <Text
                style={{
                  color: materialTheme.colors.success,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                onPress={() => {
                  expandableOverlayHeaderRightRef.current?.closeExpandable();
                }}
              >
                {translate("Close", lang)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                router.push(getNavigator("profile"));
              }}
            >
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 30,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                      marginRight: 20,
                    }}
                  >
                    <Image
                      source={userApiImage()}
                      resizeMode="cover"
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: materialTheme.colors.default,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {auth?.user?.name}
                    </Text>

                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                      }}
                    >
                      {auth?.user?.email}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Icon
                    name="edit"
                    family="AntDesign"
                    size={20}
                    color={materialTheme.colors.white}
                    onPress={() => {
                      expandableOverlayHeaderRightRef.current?.closeExpandable();
                      router.push(getNavigator("profile"));
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeLang()}>
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 30,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Language", lang)}
                  </Text>

                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    {translate("Click To Change Language", lang)}
                  </Text>
                </View>

                {/* Switch Language */}

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Chip
                    style={{
                      backgroundColor: materialTheme.colors.success,
                      borderRadius: 15,
                      paddingVertical: 5,
                    }}
                    label={lang == "ar" ? "عربي" : "English"}
                    labelStyle={{
                      color: materialTheme.colors.white,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderRadius: 15,
                marginTop: 30,
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: lang == "ar" ? "row-reverse" : "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderBottomColor: materialTheme.colors.secondary,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {translate("Sections", lang)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                router.push(getNavigator("results"));
              }}
            >
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Health Details", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={lang == "ar" ? "left" : "right"}
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                router.push(getNavigator("bodyIOS"));
              }}
            >
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Set a New Goal", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={lang == "ar" ? "left" : "right"}
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderRadius: 15,
                marginTop: 30,
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: lang == "ar" ? "row-reverse" : "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderBottomColor: materialTheme.colors.secondary,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {translate("Settings", lang)}
              </Text>
            </View>

            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Change Password", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={lang == "ar" ? "left" : "right"}
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                router.push(getNavigator("privacy"));
              }}
            >
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Privacy Policy", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={lang == "ar" ? "left" : "right"}
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                router.push(getNavigator("about"));
              }}
            >
              <View
                style={{
                  backgroundColor: materialTheme.colors.secondary,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("About Us", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name={lang == "ar" ? "left" : "right"}
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                borderRadius: 15,
                marginTop: 30,
                paddingHorizontal: 5,
                paddingVertical: 10,
                flexDirection: lang == "ar" ? "row-reverse" : "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                borderBottomColor: materialTheme.colors.secondary,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {translate("Control", lang)}
              </Text>
            </View>

            <TouchableOpacity onPress={() => logout()}>
              <View
                style={{
                  backgroundColor: materialTheme.colors.error,
                  borderRadius: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: lang == "ar" ? "row-reverse" : "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {translate("Logout", lang)}
                  </Text>
                </View>

                <View
                  style={{
                    alignItems: lang == "en" ? "flex-start" : "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="logout"
                    family="AntDesign"
                    size={15}
                    color={materialTheme.colors.white}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    >
      <Image
        source={userApiImage()}
        resizeMode="cover"
        style={{
          width: 30,
          height: 30,
          marginLeft: lang == "en" ? 10 : 0,
          marginRight: lang == "ar" ? 10 : 0,
          borderRadius: 15,
          backgroundColor: materialTheme.colors.primary,
        }}
      />
    </ExpandableOverlay>
  );
};

const stacksStyle = (lang) => {
  return StyleSheet.create({
    indexStackScreen: {
      headerStatusBarHeight: 0,
      headerShown: false,
      title: translate("Index", lang),
      headerLeft: () => {},
    },

    profileStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Profile", lang),
      headerLeft: () => (lang == "en" ? backToHome() : null),
      headerRight: () => (lang == "ar" ? backToHome() : null),
    },

    aboutStackScreen: {
      headerStatusBarHeight: 0,
      headerShown: false,
      title: translate("About", lang),
      headerLeft: () => {},
    },

    privacyStackScreen: {
      headerStatusBarHeight: 0,
      headerShown: false,
      title: translate("Privacy Policy", lang),
      headerLeft: () => {},
    },

    homeStackScreen: {
      headerShown: true,
      title: translate("Home", lang),
      headerTitleStyle: {
        color: materialTheme.colors.primary,
        fontSize: 20,
        fontFamily: "RobotoBold",
      },
      headerRight: () => (lang == "ar" ? leftHeaderImage(lang) : null),
      headerLeft: () => (lang == "en" ? leftHeaderImage(lang) : null),
    },

    loginStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Login", lang),
      headerLeft: () => {},
    },

    registerStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Register", lang),
      headerLeft: () => {},
    },

    introVideoStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Intro", lang),
      headerLeft: () => {},
    },

    verifyStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Verify", lang),
      headerLeft: () => {},
    },

    bodyStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Health Details", lang),
      headerLeft: () => {},
    },

    questionsStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Questions", lang),
      headerLeft: () => {},
    },

    resultsStackScreen: {
      headerShown: false,
      headerStatusBarHeight: 0,
      title: translate("Results", lang),
      headerLeft: () => {},
    },

    foodsStackScreen: {
      headerStatusBarHeight: 0,
      headerShown: true,
      title: translate("Food Exchanges", lang),
      headerLeft: () => backToHome(),
      headerStyle: {
        backgroundColor: materialTheme.colors.lightGreen,
      },
    },

    container: {
      backgroundColor: "#2B2C2B",
      flex: 1,
    },

    header: {
      flex: 0.3,
      backgroundColor: "#333",
      justifyContent: "flex-end",
      alignItems: lang == "ar" ? "flex-end" : "flex-start",
    },

    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.2,
    },

    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: lang == "ar" ? "flex-end" : null,
      marginBottom: 20,
      paddingHorizontal: 20,
    },

    userImageContainer: {
      marginLeft: lang == "ar" ? 20 : 0,
      marginRight: lang == "ar" ? 0 : 20,
    },

    userImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: "white",
    },

    userName: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 10,
    },

    userEmail: {
      color: "white",
      fontSize: 16,
    },

    body: {
      flex: 1,
      padding: 20,
    },

    item: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: materialTheme.colors.success,
      opacity: 0.8,
    },

    itemInActive: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: materialTheme.colors.placeholder,
      opacity: 0.8,
    },

    itemError: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: materialTheme.colors.error,
      opacity: 0.8,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },

    footer: {
      flex: 0.1,
      justifyContent: "flex-end",
      marginBottom: 20,
      paddingHorizontal: 20,
    },
  });
};

const Stacks = () => {
  const lang = useSelector((state) => state.lang.lang);

  const stacksStyles = stacksStyle(lang);

  return (
    <RootSiblingParent>
      <Stack>
        {/* index */}
        <Stack.Screen name="index" options={stacksStyles.indexStackScreen} />
        <Stack.Screen name="home" options={stacksStyles.homeStackScreen} />

        {/* settings */}
        <Stack.Screen
          name="settings/profile"
          options={stacksStyles.profileStackScreen}
        />

        <Stack.Screen
          name="settings/about"
          options={stacksStyles.aboutStackScreen}
        />

        <Stack.Screen
          name="settings/privacy"
          options={stacksStyles.privacyStackScreen}
        />

        {/* auth */}
        <Stack.Screen
          name="auth/login"
          options={stacksStyles.loginStackScreen}
        />
        <Stack.Screen
          name="auth/register"
          options={stacksStyles.registerStackScreen}
        />
        <Stack.Screen
          name="auth/verify"
          options={stacksStyles.verifyStackScreen}
        />
        <Stack.Screen
          name="auth/intro"
          options={stacksStyles.introVideoStackScreen}
        />

        {/* questionnaire */}
        <Stack.Screen
          name="questionnaire/questions"
          options={stacksStyles.questionsStackScreen}
        />
        <Stack.Screen
          name="questionnaire/BodyIOS"
          options={stacksStyles.bodyStackScreen}
        />
        <Stack.Screen
          name="questionnaire/results"
          options={stacksStyles.resultsStackScreen}
        />

        {/* nutrition */}
        <Stack.Screen
          name="nutrition/foods"
          options={stacksStyles.foodsStackScreen}
        />
      </Stack>
    </RootSiblingParent>
  );
};

export default Stacks;
