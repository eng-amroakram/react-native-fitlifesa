import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
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
import { useRouter } from "expo-router";
import privacyStyle from "../../assets/styles/privacy";
import HTMLRender from "react-native-render-html";

const { height, width } = Dimensions.get("screen");

const Privacy = () => {
  const [loading, setLoading] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const lang = useSelector((state) => state.lang.lang);

  const router = useRouter();
  const privacyStyles = privacyStyle(lang);

  useEffect(() => {
    const getPrivacy = async () => {
      setLoading(true);
      let token = await storage.get("token");
      let lang = await storage.get("lang");

      let response = await api.get(routes.settings.getSettings, {
        token: token,
        lang: lang,
        query: "?",
      });


      console.log(response);

      let settings = response.data;
      let privacy = settings.privacy_policy;
      setPrivacy(privacy);
      setLoading(false);
    };

    getPrivacy();
  }, []);

  return (
    <ImageBackground
      source={Images.loginCover}
      style={privacyStyles.backgroundImage}
      resizeMode="contain"
    >
      <SafeAreaView style={privacyStyles.safeAreaView}>
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
          <View style={privacyStyles.containerLoading}>
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
          <View style={privacyStyles.container}>
            <Text style={privacyStyles.title}>
              {translate("Privacy Policy", lang)}
            </Text>
            <ScrollView scrollsToTop={true}>
              <HTMLRender
                source={{
                  html: privacy ?? "No Data",
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

export default Privacy;
