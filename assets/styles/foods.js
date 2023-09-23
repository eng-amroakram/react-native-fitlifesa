import { StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const foodsStyle = (lang) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: materialTheme.colors.lightGreen,
      // justifyContent: "center",
    },

    header: {
      backgroundColor: materialTheme.colors.lightGreen,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
      marginBottom: 20,
    },

    headerText: {
      fontSize: 22,
      fontFamily: "RobotoBold",
      color: "##4A6C2F",
    },

    macrosInfoContainer: {
      flexDirection: lang === "ar" ? "row-reverse" : "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "90%",
      marginTop: 20,
    },

    macrosInfo: {
      width: 60,
      height: 100,
      backgroundColor: "#398E3D",
      justifyContent: "space-around",
      alignItems: "center",
      marginHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 30,
    },

    macrosInfoTitle: {
      fontSize: 10,
      fontFamily: "RobotoBold",
      color: "#FFFFFF",
    },
    macrosInfoValue: {
      fontSize: 9,
      fontFamily: "RobotoBold",
      color: "#000",
    },

    macrosTexts: {
      backgroundColor: "#FFFFFF",
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },

    scrollBarContainer: {
      width: "90%",
      marginTop: 20,
    },

    buttonScrollBar: {
      backgroundColor: "#398E3D",
      marginHorizontal: 5,
      height: 30,
      paddingVertical: 0,
      paddingHorizontal: 0,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      fontFamily: "RobotoBold",
      fontSize: 14,
    },

    card: {
      backgroundColor: materialTheme.colors.white,
      borderRadius: 5,
      marginTop: 10,
      borderWidth: 0.5,
    },

    cardImage: {
      width: 83.5,
      height: 60,
      borderRadius: 5,
    },

    cardTitle: {
      fontSize: 14,
      fontFamily: "RobotoBold",
      color: materialTheme.colors.black,
      textAlign: lang === "ar" ? "right" : "left",
    },

    cardText: {
      fontSize: 14,
      fontFamily: "Roboto",
      marginRight: lang === "ar" ? 0 : 10,
      marginLeft: lang === "ar" ? 10 : 0,
    },
  });
};

export default foodsStyle;
