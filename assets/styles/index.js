import { StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

const indexStyle = (lang) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: materialTheme.colors.primary,
    },

    imageContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    image: {
      width: width,
      height: height,
      resizeMode: "contain",
    },

    textContainer: {
      paddingHorizontal: 20,
      position: "absolute",
      bottom: width * 0.1,
      width: width,
    },

    textContainerTwo: {
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: 20,
      borderRadius: 10,
    },

    title: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },

    subTitle: {
      color: "white",
      fontSize: 14,
      fontStyle: "italic",
      textAlign: lang == "ar" ? "right" : "justify",
    },

    footerText: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: lang == "ar" ? "right" : "left",
    },

    footer: {
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },

    inActiveLanguageButton: {
      backgroundColor: materialTheme.colors.primary,
      opacity: 0.9,
      borderWidth: 0,
      borderRadius: 20,
      width: width * 0.7,
      height: 40,
      marginTop: 10,
    },

    activeLanguageButton: {
      backgroundColor: materialTheme.colors.success,
      opacity: 0.9,
      borderWidth: 0,
      borderRadius: 20,
      width: width * 0.7,
      height: 40,
      marginTop: 10,
    },

    languageLabelButton: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
    },
  });
};

export default indexStyle;
