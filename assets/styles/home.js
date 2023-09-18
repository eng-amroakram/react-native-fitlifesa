import { StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const homeStyle = (lang) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: materialTheme.colors.white,
    },

    headerScreen: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 10,
      padding: 20,
    },

    leftHeader: {
      padding: 10,
      borderRadius: 20,
      flexDirection: "column",
    },

    rightHeader: {
      backgroundColor: materialTheme.colors.red,
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
    },

    userName: {
      color: materialTheme.colors.black,
      fontSize: 16,
      fontWeight: "bold",
    },

    specialOffersText: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },

    dateText: {
      color: materialTheme.colors.success,
      fontSize: 14,
      fontWeight: "bold",
      fontStyle: "italic",
    },

    specialOffersIcon: {
      width: 30,
      height: 30,
      resizeMode: "contain",
      marginLeft: lang == "ar" ? 0 : 10,
      marginRight: lang == "ar" ? 10 : 0,
    },

    servicesSection: {
      flex: 1,
      margin: 20,
    },

    nutritionSectionCard: {
      backgroundColor: materialTheme.colors.success,
      shadowColor: materialTheme.colors.black,
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      margin: -5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    nutritionSectionCardText: {
      flex: 1,
      flexDirection: "column",
    },

    nutritionSectionCardTextTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },

    nutritionSectionCardTextSubTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontStyle: "italic",
      textAlign: lang == "ar" ? "right" : "left",
    },

    nutritionSectionCardIcon: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },

    exercisesSectionCard: {
      backgroundColor: materialTheme.colors.yellow,
      shadowColor: materialTheme.colors.black,
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      margin: -5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 20,
    },

    exercisesSectionCardText: {
      flex: 1,
      flexDirection: "column",
    },

    exercisesSectionCardTextTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },

    exercisesSectionCardTextSubTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontStyle: "italic",
      textAlign: lang == "ar" ? "right" : "left",
    },

    exercisesSectionCardIcon: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },

    servicesSectionCard: {
      backgroundColor: materialTheme.colors.orange,
      shadowColor: materialTheme.colors.black,
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      margin: -5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 20,
    },

    servicesSectionCardText: {
      flex: 1,
      flexDirection: "column",
    },

    servicesSectionCardTextTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },

    servicesSectionCardTextSubTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontStyle: "italic",
      textAlign: lang == "ar" ? "right" : "left",
    },

    servicesSectionCardIcon: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },

    specialistsSectionCard: {
      backgroundColor: materialTheme.colors.blue,
      shadowColor: materialTheme.colors.black,
      flexDirection: "row",
      padding: 15,
      borderRadius: 10,
      margin: -5,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      marginTop: 20,
    },

    specialistsSectionCardText: {
      flex: 1,
      flexDirection: "column",
    },

    specialistsSectionCardTextTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },

    specialistsSectionCardTextSubTitle: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontStyle: "italic",
      textAlign: lang == "ar" ? "right" : "left",
    },

    specialistsSectionCardIcon: {
      width: 80,
      height: 80,
      resizeMode: "contain",
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      borderRadius: 10,
      borderWidth: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    overlayText: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: lang == "ar" ? "right" : "left",
    },
  });
};
export default homeStyle;
