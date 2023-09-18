import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const verifyStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: materialTheme.colors.primary,
    },
    imageBackground: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },

    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: materialTheme.colors.white,
      textAlign: "center",
      marginBottom: 20,
    },
    subTitle: {
      fontSize: 15,
      color: materialTheme.colors.white,
      textAlign: "center",
      marginBottom: 20,
    },

    inputCode: {
      width: width * 0.8,
      borderWidth: 1,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      textAlign: "center",
      fontWeight: "bold",
      borderRadius: 5,
      color: materialTheme.colors.white,
      borderColor: materialTheme.colors.success,
      backgroundColor: "transparent",
      marginBottom: 20,
      fontSize: 20,
    },
  });
};

export default verifyStyle;
