import { Dimensions, ScrollView, StyleSheet } from "react-native";
import translate from "../../lang/localizer";
import materialTheme from "../../constants/Theme";
import { Icon } from "galio-framework";
import {
  Chip,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import Images, { userApiImage } from "../../constants/Images";
import { ExpandableOverlay } from "react-native-ui-lib/src/incubator";
import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import storage from "../../services/storage";
import { useRouter } from "expo-router";
import getNavigator from "../../services/navigators";
import lang, { setLang } from "../../redux/slices/lang";

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
          marginLeft: lang == "en" ? 20 : 0,
          marginRight: lang == "ar" ? 10 : 0,
        }}
      >
        {lang == "ar" ? null : (
          <Icon
            name="left"
            family="AntDesign"
            size={20}
            color={materialTheme.colors.primary}
          />
        )}

        <Text
          style={{
            color: materialTheme.colors.primary,
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          {translate("Back", lang)}
        </Text>

        {lang == "ar" ? (
          <Icon
            name="right"
            family="AntDesign"
            size={20}
            color={materialTheme.colors.primary}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const leftHeaderImage = () => {
  const expandableOverlayHeaderRightRef = createRef();
  const auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang.lang);

  const router = useRouter();
  const dispatch = useDispatch();

  const changeLang = async () => {
    let lang = await storage.get("lang");
    let changeLang = lang == "ar" ? "en" : "ar";

    dispatch(setLang(changeLang));
    await storage.set("lang", changeLang);
    router.push(getNavigator("home"));
  };

  return (
    <ExpandableOverlay
      ref={expandableOverlayHeaderRightRef}
      useDialog
      onPress={() => {
        console.log("pressed");
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
              height: height,
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
                {translate("Done", lang)}
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
                {translate("Done", lang)}
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

            <TouchableOpacity
              onPress={() => {
                expandableOverlayHeaderRightRef.current?.closeExpandable();
                navigation.navigate("settings");
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
                    {translate("Settings", lang)}
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
          marginLeft: lang == "ar" ? 20 : 0,
          marginRight: lang == "ar" ? 0 : 20,
          borderRadius: 15,
          backgroundColor: materialTheme.colors.primary,
        }}
      />
    </ExpandableOverlay>
  );
};

const drawerStyle = (lang) => {
  return StyleSheet.create({
    indexDrawerScreen: {
      headerShown: false,
      title: translate("Index", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    profileDrawerScreen: {
      headerShown: false,
      title: translate("Profile", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => (lang == "en" ? backToHome() : null),
      headerRight: () => (lang == "ar" ? backToHome() : null),
    },

    aboutDrawerScreen: {
      headerShown: true,
      title: translate("About", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    homeDrawerScreen: {
      headerShown: true,
      title: translate("Home", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,

      headerRight: () => (lang == "en" ? leftHeaderImage() : null),
      headerLeft: () => (lang == "ar" ? leftHeaderImage() : null),
    },

    loginDrawerScreen: {
      headerShown: false,
      title: translate("Login", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    registerDrawerScreen: {
      headerShown: false,
      title: translate("Register", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    introVideoDrawerScreen: {
      headerShown: false,
      title: translate("Intro", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    verifyDrawerScreen: {
      headerShown: false,
      title: translate("Verify", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    bodyDrawerScreen: {
      headerShown: false,
      title: translate("Health Details", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    questionsDrawerScreen: {
      headerShown: false,
      title: translate("Questions", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
    },

    resultsDrawerScreen: {
      headerShown: false,
      title: translate("Results", lang),
      gestureHandlerProps: {
        enabled: false,
      },
      headerStatusBarHeight: 0,
      headerLeft: () => {},
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

export default drawerStyle;
