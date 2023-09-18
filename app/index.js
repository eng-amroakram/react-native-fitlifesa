import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import Images from "../constants/Images";
import { Button } from "react-native-ui-lib";
import translate from "../lang/localizer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { setLang } from "../redux/slices/lang";
import storage from "../services/storage";
import indexStyle from "../assets/styles/index";
import getNavigator from "../services/navigators";
import { setUser } from "../redux/slices/auth";
import api, { routes } from "../services/routes";

const { height, width } = Dimensions.get("screen");

const Index = () => {
  const [colorEnglishButton, setColorEnglishButton] = useState(false);
  const [colorArabicButton, setColorArabicButton] = useState(false);
  const [colorContinueButton, setColorContinueButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLang, setIsLang] = useState(false);
  const [isToken, setIsToken] = useState(false);

  //Redux
  const auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  //Styles
  const indexStyles = indexStyle(lang);

  //Routes
  const router = useRouter();

  //Set Lang System
  const handleLang = async (choice) => {
    setLoading(true);
    dispatch(setLang(choice));
    await storage.set("lang", choice);

    await storage.get("token").then((token) => {
      if (token) {
        router.push(getNavigator("home"));
      } else {
        router.push(getNavigator("login"));
      }
    });

    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      // storage.clear();
      let lang = await storage.get("lang");
      let token = await storage.get("token");
      let user = await storage.get("user");

      api
        .get(routes.profile.user, {
          token: token,
          lang: lang,
        })
        .then((res) => {
          if (res.status == 200) {
            user = res.data;
            storage.set("user", JSON.stringify(user));
            storage.set("token", token);
            dispatch(setUser(user));
          }

          if (res.status == 401) {
            storage.remove("token");
            storage.remove("user");
            dispatch(setUser(null));
          }
        });

      if (token && lang) {
        user = JSON.parse(user);
        dispatch(setUser(user));
        dispatch(setLang(lang));
        router.push(getNavigator("home"));
      }

      if (!lang && token) {
        setIsLang(false);
        setIsToken(true);
      }

      if (!token && lang) {
        setIsLang(true);
        setIsToken(false);
        router.push(getNavigator("login"));
      }

      if (!token && !lang) {
        setIsLang(false);
        setIsToken(false);
        router.push(getNavigator("login"));
      }
    };

    init();
  }, []);

  return (
    <View style={indexStyles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={indexStyles.imageContainer}>
        <ImageBackground source={Images.Onboarding} style={indexStyles.image} />
      </View>

      <View style={indexStyles.textContainer}>
        <View style={indexStyles.textContainerTwo}>
          <View>
            <Text style={indexStyles.title}>{translate("FitLife", lang)}</Text>

            <Text style={indexStyles.subTitle}>
              {translate(
                "Get to a healthier and more active life, It's hard to know how much or need to stay healthy what kind of activity you need to stay healthy",
                lang
              )}
            </Text>

            <Text style={indexStyles.footerText}>
              {translate("Let's get started with Fitlife", lang)}
            </Text>
          </View>
        </View>

        <View style={indexStyles.footer}>
          {!isLang ? (
            <Text style={indexStyles.footerText}>
              {translate("Choose your language", lang)}
            </Text>
          ) : null}

          {!isLang ? (
            <Button
              label={translate("English", lang)}
              labelStyle={indexStyles.languageLabelButton}
              style={
                colorEnglishButton
                  ? indexStyles.activeLanguageButton
                  : indexStyles.inActiveLanguageButton
              }
              onPress={() => handleLang("en")}
              onPressIn={() => {
                setColorEnglishButton(true);
              }}
              onPressOut={() => {
                setColorEnglishButton(false);
              }}
            />
          ) : null}

          {!isLang ? (
            <Button
              label={translate("Arabic", lang)}
              labelStyle={indexStyles.languageLabelButton}
              style={
                colorArabicButton
                  ? indexStyles.activeLanguageButton
                  : indexStyles.inActiveLanguageButton
              }
              onPress={() => handleLang("ar")}
              onPressIn={() => {
                setColorArabicButton(true);
              }}
              onPressOut={() => {
                setColorArabicButton(false);
              }}
            />
          ) : null}

          {/* {isToken && isLang ? (
            <Button
              label={translate("Continue", lang)}
              labelStyle={indexStyles.languageLabelButton}
              style={
                colorContinueButton
                  ? indexStyles.activeLanguageButton
                  : indexStyles.inActiveLanguageButton
              }
              onPressIn={() => {
                setColorContinueButton(true);
              }}
              onPressOut={() => {
                setColorContinueButton(false);
              }}
            />
          ) : null} */}
        </View>
      </View>
    </View>
  );
};

export default Index;
