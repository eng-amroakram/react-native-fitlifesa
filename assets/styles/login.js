import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");
const loginStyle = (lang) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    backgroundImage: {
      width: width,
      height: height,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    titleText: {
      color: materialTheme.colors.white,
      fontSize: 30,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },

    formContainer: {
      width: width,
      height: height,
      flex: 0.5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      padding: 20,
    },

    form: {
      width: width * 0.9,
    },

    formGroup: {
      marginBottom: 20,
    },

    formInput: {
      fontSize: 16,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderColor: materialTheme.colors.default,
      color: materialTheme.colors.default,
      backgroundColor: "transparent",
    },

    formButton: {
      borderRadius: 20,
      backgroundColor: materialTheme.colors.success,
      marginTop: 20,
      width: width * 0.6,
      alignSelf: "center",
    },

    formIcon: {
      color: materialTheme.colors.placeholder,
    },

    errorText: {
      color: materialTheme.colors.error,
      fontSize: 12,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 10,
      marginRight: lang === "ar" ? 10 : 0,
    },

    forgotPasswordText: {
      color: materialTheme.colors.default,
      fontSize: 12,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 10,
      marginRight: lang === "ar" ? 10 : 0,
    },

    forgotPasswordText: {
      color: materialTheme.colors.default,
      fontSize: 12,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 10,
      marginRight: lang === "ar" ? 10 : 0,
      textDecorationLine: "underline",
    },

    registerContainer: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      alignItems: "center",
      marginTop: 20,
      marginRight: lang === "ar" ? 0 : 10,
      marginLeft: lang === "ar" ? 10 : 0,
      marginBottom: 20,
    },

    registerText: {
      color: materialTheme.colors.default,
      fontSize: 14,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 10,
      marginRight: lang === "ar" ? 10 : 0,
    },

    registerTextButton: {
      color: materialTheme.colors.success,
      fontSize: 14,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 3,
      marginRight: lang === "ar" ? 3 : 0,
    },
  });
};

export default loginStyle;
