import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const resultsStyle = (lang) => {
  return StyleSheet.create({
    scrollView: {},

    imageBackground: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      height: height,
      width: width,
    },

    container: {
      height: height * 1.2,
      width: width,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },

    headerTexts: {
      paddingTop: 110,
      borderBottomWidth: 5,
      marginHorizontal: 20,
      paddingBottom: 10,
      borderBottomColor: materialTheme.colors.dark_grey,
    },

    title: {
      fontSize: 24,
      textAlign: lang === "en" ? "left" : "right",
      color: materialTheme.colors.default,
      fontFamily: "RobotoBold",
    },

    subtitle: {
      fontSize: 16,
      textAlign: lang === "en" ? "left" : "right",
      color: materialTheme.colors.placeholder,
      fontFamily: "RobotoItalic",
    },

    card: {
      backgroundColor: materialTheme.colors.dark,
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
      shadowColor: materialTheme.colors.default,
      elevation: 5,
    },

    cardHeader: {
      borderBottomWidth: 1,
      borderBottomColor: materialTheme.colors.dark_grey,
      padding: 5,
    },

    cardImage: {
      width: 80,
      height: 80,
    },

    cardTitle: {
      fontSize: 16,
      color: materialTheme.colors.default,
      fontFamily: "RobotoBold",
      textAlign: lang === "en" ? "left" : "right",
    },

    cardBody: {
      flexDirection: lang == "en" ? "row" : "row-reverse",
      justifyContent: "space-between",
      padding: 10,
    },

    cardBodyTexts: {},

    cardBodyTextTitle: {
      fontSize: 16,
      color: materialTheme.colors.success,
      fontFamily: "RobotoItalic",
      textAlign: lang === "en" ? "left" : "right",
      marginBottom: 10,
    },

    cardBodyTextResult: {
      fontSize: 16,
      color: materialTheme.colors.placeholder,
      fontFamily: "RobotoItalic",
      textAlign: lang === "en" ? "left" : "right",
      fontWeight: "bold",
    },

    cardFooter: {
      justifyContent: "center",
      paddingLeft: 10,
    },

    cardFooterTextTitle: {
      fontSize: 16,
      color: materialTheme.colors.success,
      fontFamily: "Roboto",
    },

    cardFooterTextResult: {
      fontSize: 16,
      color: materialTheme.colors.placeholder,
      fontFamily: "Roboto",
      fontWeight: "bold",
    },

    buttonContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 10,
      marginHorizontal: 20,
    },

    button: {
      backgroundColor: materialTheme.colors.success,
      borderRadius: 10,
      width: width * 0.8,
    },

    buttonText: {
      fontSize: 16,
      color: materialTheme.colors.default,
      fontFamily: "RobotoBold",
      textAlign: "center",
    },
  });
};

export default resultsStyle;
