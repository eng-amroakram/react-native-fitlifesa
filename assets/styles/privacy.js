import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const privacyStyle = (lang) => {
  return StyleSheet.create({
    container: {
      marginTop: 30,
      marginHorizontal: 10,
      borderRadius: 10,
      height: height * 0.72,
      borderWidth: 2,
      padding: 10,
      borderColor: materialTheme.colors.success,
    },

    containerLoading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      fontSize: 24,
      color: materialTheme.colors.success,
      fontFamily: "RobotoBold",
      marginBottom: 5,
      textAlign: lang === "ar" ? "right" : "left",
    },

    subtitle: {
      fontSize: 15,
      fontFamily: "Roboto",
      color: materialTheme.colors.white,
      marginBottom: 20,
      textAlign: lang === "ar" ? "right" : "left",
    },

    backgroundImage: {
      width: width,
      height: height,
    },

    safeAreaView: {
      flex: 1,
    },
  });
};

export default privacyStyle;
