import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const profileStyle = (lang) => {
  return StyleSheet.create({
    container: {
      alignItems: "center",
    },

    profileImageContainer: {
      marginBottom: 20,
      borderWidth: 2,
      borderColor: materialTheme.colors.placeholder,
      backgroundColor: materialTheme.colors.default,
      borderRadius: 76,
      width: 152,
      height: 152,
      justifyContent: "center",
      alignItems: "center",
    },

    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      justifyContent: "center",
      alignItems: "center",
    },

    inputContainer: {
      width: "80%",
      marginBottom: 10,
    },

    input: {
      fontSize: 18,
    },

    saveButton: {
      backgroundColor: "#007AFF",
      marginTop: 20,
      width: "60%",
      borderRadius: 10,
    },

    formInput: {
      fontSize: 16,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderColor: materialTheme.colors.success,
      color: materialTheme.colors.default,
      backgroundColor: "transparent",
    },

    errorText: {
      color: materialTheme.colors.error,
      fontSize: 12,
      textAlign: lang === "ar" ? "right" : "left",
      marginLeft: lang === "ar" ? 0 : 10,
      marginRight: lang === "ar" ? 10 : 0,
    },

    formButton: {
      borderRadius: 20,
      backgroundColor: materialTheme.colors.success,
      marginTop: 20,
      width: width * 0.6,
      alignSelf: "center",
    },

    image: {
      flex: 1,
      resizeMode: "cover",
      height: height,
      width: width,
      paddingVertical: 40,
      paddingHorizontal: 20,
    },

    titleText: {
      color: materialTheme.colors.white,
      fontSize: 30,
      fontFamily: "RobotoBold",
      textAlign: "center",
      marginBottom: 20,
    },
  });
};
export default profileStyle;
