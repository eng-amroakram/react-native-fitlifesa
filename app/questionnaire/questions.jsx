import React, { useState } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import {
  Button,
  RadioButton,
  RadioGroup,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import api, { routes } from "../../services/routes";
import { useRouter } from "expo-router";
import { setUser } from "../../redux/slices/auth";
import { Icon } from "galio-framework";
import Images from "../../constants/Images";
import materialTheme from "../../constants/Theme";
import translate from "../../lang/localizer";
import questionsStyle from "../../assets/styles/questions";
import ToastMessage from "../../constants/Toaster";
import storage from "../../services/storage";
import getNavigator from "../../services/navigators";
import { setLang } from "../../redux/slices/lang";

const Questions = () => {
  const [loading, setLoading] = useState(false);

  //Redux
  const auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  //Inputs
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");
  const [level, setLevel] = useState("");
  const [kg_per_week, setKgPerWeek] = useState("");

  //Styles
  const questionsStyles = questionsStyle(lang);

  //Router
  const router = useRouter();

  //Questions
  const questions = {
    "What is your goal?": {
      lose: "Lose weight",
      gain: "Gain weight",
      maintain: "Maintain weight",
    },
    "What is your activity intensity for your goal?": {
      low: "Slightly Active (1-2 days/week)",
      medium: "Moderately Active (3-4 days/week)",
      high: "Very Active (5-6 days/week)",
      off: "Not Active (0 days/week)",
    },
    "Choose your level: -": {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    "How much weight do you want to gain/lose per week?": {
      0.5: "0.5 Kg per week",
      1: "1 Kg per week",
    },
  };

  const submit = async () => {
    setLoading(true);
    let age = await storage.get("age");
    let height = await storage.get("height");
    let weight = await storage.get("weight");
    let gender = await storage.get("gender");
    let birthDay = await storage.get("birthDay");
    let token = await storage.get("token");

    console.log("Age: ", age);
    console.log("Height: ", height);
    console.log("Weight: ", weight);
    console.log("Gender: ", gender);
    console.log("BirthDay: ", birthDay);

    if (age && height && weight && gender) {
      let data = {
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        goal: goal,
        activity: activity,
        level: level,
        kg_per_week: kg_per_week,
      };

      console.log("Data: ", data);

      let response = await api.post(routes.questionnaire.questions, data, {
        lang: lang,
        token: `Bearer ${token}`,
      });

      console.log("Response: ", response);

      if (response.status == 200) {
        let user = response.data.user;
        if (user.is_body_info_completed) {
          await storage.set("user", JSON.stringify(user));
          dispatch(setUser(user));
          ToastMessage("Questionnaire Completed Successfully", "success", lang);
          router.push(getNavigator("results"));
          setLoading(false);
          return;
        } else {
          ToastMessage(
            "Something went wrong with questionnaire, try again",
            "error",
            lang
          );
          router.push(getNavigator("bodyIOS"));
        }
      }

      if (response.status == 422) {
        setLoading(false);
        ToastMessage("Please Answer All Questions", "error", lang);
      }

      if (response?.status == 401) {
        ToastMessage("Unauthorized", "error", lang);
        setTimeout(async () => {
          dispatch(setUser(null));
          await storage.remove("token");
          await storage.remove("user");
          dispatch(setLang("en"));
          ToastMessage("Login to continue", "error", "en");
          setLoading(false);
          router.push(getNavigator("login"));
        }, 1000);
      }

      setLoading(false);
    } else {
      ToastMessage("Please fill in your body info", "error", lang);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={Images.loginCover}
      resizeMode="cover"
      style={questionsStyles.backgroundImage}
    >
      <SafeAreaView style={questionsStyles.safeAreaView}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => router.push(getNavigator("bodyIOS"))}
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
        <ScrollView>
          <View style={questionsStyles.container}>
            <Text style={questionsStyles.title}>
              {translate("Questionnaire", lang)}
            </Text>
            <Text style={questionsStyles.subtitle}>
              {translate(
                "Please answer the following questions to help us create your personalized meal plan.",
                lang
              )}
            </Text>
            <View style={questionsStyles.questions}>
              {Object.keys(questions).map((question, index) => (
                <View key={index} style={questionsStyles.question}>
                  <Text style={questionsStyles.questionText}>
                    {translate(question, lang)}
                  </Text>
                  <View style={questionsStyles.answers}>
                    {Object.keys(questions[question]).map((answer, index) => (
                      <RadioGroup
                        key={index}
                        initialValue={
                          question === "What is your goal?"
                            ? goal
                            : question ===
                              "What is your activity intensity for your goal?"
                            ? activity
                            : question === "Choose your level: -"
                            ? level
                            : kg_per_week
                        }
                        style={questionsStyles.answer}
                        onValueChange={(value) => {
                          if (question === "What is your goal?") {
                            setGoal(value);
                          } else if (
                            question ===
                            "What is your activity intensity for your goal?"
                          ) {
                            setActivity(value);
                          } else if (question === "Choose your level: -") {
                            setLevel(value);
                          } else if (
                            question ===
                            "How much weight do you want to gain/lose per week?"
                          ) {
                            setKgPerWeek(value);
                          }
                        }}
                      >
                        <RadioButton
                          value={answer}
                          label={translate(questions[question][answer], lang)}
                          color={materialTheme.colors.success}
                          size={20}
                          labelStyle={questionsStyles.answerText}
                          contentOnLeft={lang == "ar" ? true : false}
                        />
                      </RadioGroup>
                    ))}
                  </View>
                </View>
              ))}

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={materialTheme.colors.success}
                ></ActivityIndicator>
              ) : (
                <Button
                  label={translate("Submit", lang)}
                  style={questionsStyles.button}
                  labelStyle={questionsStyles.buttonText}
                  onPress={submit}
                ></Button>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Questions;
