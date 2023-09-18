import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const questionsStyle = (lang) => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },

    scrollView: {
      flex: 1,
    },

    container: {
      flex: 1,
      padding: 20,
    },

    backgroundImage: {
      position: "absolute",
      width: width,
      height: height,
    },

    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 10,
      color: materialTheme.colors.default,
      textAlign: lang == "en" ? "left" : "right",
      fontFamily: "Cairo",
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      color: materialTheme.colors.placeholder,
      textAlign: lang == "en" ? "left" : "right",
      fontFamily: "Cairo",
    },
    questions: {
      marginTop: 20,
      height: height * 0.99,
    },
    question: {
      marginBottom: 20,
    },
    questionText: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
      color: materialTheme.colors.default,
      textAlign: lang == "en" ? "left" : "right",
      fontFamily: "Cairo",
    },
    answers: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
    answer: {
      width: width * 0.9,
      marginBottom: 10,
      flexDirection: lang == "en" ? "row" : "row-reverse",
    },
    answerText: {
      fontSize: 16,
      color: materialTheme.colors.placeholder,
      textAlign: lang == "en" ? "left" : "right",
      fontFamily: "Cairo",
    },
    button: {
      backgroundColor: materialTheme.colors.success,
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: materialTheme.colors.default,
      textAlign: "center",
      fontSize: 16,
    },
  });
};

export default questionsStyle;
