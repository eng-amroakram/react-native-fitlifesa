import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  LoaderScreen,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import getNavigator from "../../services/navigators";
import { Icon } from "galio-framework";
import Images from "../../constants/Images";
import materialTheme from "../../constants/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import api, { routes } from "../../services/routes";
import storage from "../../services/storage";
import { useSelector } from "react-redux";
import translate from "../../lang/localizer";
import aboutStyle from "../../assets/styles/about";
import { useRouter } from "expo-router";
import HTMLRender from "react-native-render-html";

const { height, width } = Dimensions.get("screen");

const About = () => {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState(false);
  const lang = useSelector((state) => state.lang.lang);

  const aboutStyles = aboutStyle(lang);

  const router = useRouter();

  useEffect(() => {
    const getAbout = async () => {
      setLoading(true);
      let token = await storage.get("token");
      let lang = await storage.get("lang");
      let response = await api.get(routes.settings.getSettings, {
        token: token,
        lang: lang,
        query: "?",
      });

      let settings = response.data;
      let about = settings.about_us;
      setAbout(about);
      setLoading(false);
    };

    getAbout();
  }, []);

  return (
    <ImageBackground
      source={Images.loginCover}
      style={aboutStyles.backgroundImage}
      resizeMode="contain"
    >
      <SafeAreaView style={aboutStyles.safeAreaView}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => router.push(getNavigator("home"))}
            style={{
              marginLeft: 20,
            }}
          >
            <Icon
              name="arrow-left-circle"
              family="Feather"
              size={40}
              color={materialTheme.colors.white}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={aboutStyles.containerLoading}>
            <LoaderScreen
              message={translate("Loading...", lang)}
              messageStyle={{
                color: materialTheme.colors.white,
                fontFamily: "RobotoBold",
                fontSize: 20,
              }}
              color={materialTheme.colors.success}
            />
          </View>
        ) : (
          <View style={aboutStyles.container}>
            <Text style={aboutStyles.title}>{translate("About Us", lang)}</Text>
            <ScrollView showsVerticalScrollIndicator={true}>
              <HTMLRender
                source={{
                  html: about ?? "No Data",
                }}
                baseStyle={{
                  color: materialTheme.colors.white,
                  fontFamily: "Roboto",
                  textAlign: lang === "ar" ? "right" : "left",
                }}
                contentWidth={width}
              />
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default About;
