import { Dimensions, StyleSheet } from "react-native";
import materialTheme from "../../constants/Theme";

const { height, width } = Dimensions.get("screen");

const bodyIosStyle = () => {
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },

    container: {
      flex: 1,
    },

    imageBackground: {
      position: "absolute",
      width: width,
      height: height,
    },

    contentContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },

    headerContainer: {
      flex: 0.4,
      width: width * 0.9,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 70,
      marginBottom: 20,
    },

    headerMiddleText: {
      fontSize: 30,
      color: materialTheme.colors.white,
      textAlign: "center",
      fontFamily: "Cairo",
    },

    bodyContainer: {
      width: width * 0.8,
      height: height * 0.19,
      backgroundColor: materialTheme.colors.primary,
      borderRadius: 10,
      justifyContent: "center",
      padding: 10,
    },

    rowContainer: {
      flexDirection: lang == "en" ? "row" : "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: materialTheme.colors.dark,
    },

    rowContainerTextTitle: {
      color: materialTheme.colors.white,
      fontFamily: "Roboto",
      fontSize: 18,
    },

    rowContainerText: {
      color: materialTheme.colors.success,
      fontFamily: "Roboto",
      fontSize: 14,
    },

    lastRowContainer: {
      flexDirection: lang == "en" ? "row" : "row-reverse",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },

    footerContainer: {
      flex: 0.7,
      width: width * 0.9,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },

    footerButton: {
      width: width * 0.7,
      height: height * 0.04,
      backgroundColor: materialTheme.colors.secondary,
      borderRadius: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    footerButtonText: {
      color: materialTheme.colors.white,
      fontSize: 16,
      fontWeight: "bold",
    },

    //Pickers Styles

    expandablePicker: {
      width: width * 1,
      height: height * 1,
      backgroundColor: materialTheme.colors.primary,
      borderRadius: 20,
      alignItems: "center",
    },

    //Date Picker Styles

    expandableDateSpinnerHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 15,
      width: width * 0.9,
    },

    expandableDateSpinner: {
      width: width,
      height: height * 0.25,
      backgroundColor: materialTheme.colors.primary,
    },

    expandableDateDialog: {
      width: width,
      bottom: true,
      containerStyle: {
        width: width * 1,
        height: height * 0.3,
        backgroundColor: materialTheme.colors.primary,
        borderRadius: 20,
      },
    },

    expandableSexSpinner: {
      width: width,
      backgroundColor: materialTheme.colors.primary,
      borderRadius: 20,
    },

    //Sex Picker Styles
    expandableSexSpinnerHeader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingTop: 15,
      width: width * 0.9,
    },

    expandableSexDialog: {
      width: width,
      bottom: true,
      containerStyle: {
        width: width * 1,
        height: height * 0.3,
        backgroundColor: materialTheme.colors.primary,
        borderRadius: 20,
      },
    },

    //Height Picker Styles
    expandableHeightSpinner: {
      width: width,
      backgroundColor: materialTheme.colors.primary,
      borderRadius: 20,
    },

    expandableHeightSpinnerHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 15,
      width: width * 0.9,
    },

    expandableHeightDialog: {
      width: width,
      bottom: true,
      containerStyle: {
        width: width * 1,
        height: height * 0.3,
        backgroundColor: materialTheme.colors.primary,
        borderRadius: 20,
      },
    },

    //Weight Picker Styles

    expandableWeightSpinner: {
      width: width,
      backgroundColor: materialTheme.colors.primary,
      borderRadius: 20,
    },

    expandableWeightSpinnerHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 15,
      width: width * 0.9,
    },

    expandableWeightDialog: {
      width: width,
      bottom: true,
      containerStyle: {
        width: width * 1,
        height: height * 0.3,
        backgroundColor: materialTheme.colors.primary,
        borderRadius: 20,
      },
    },

    doneButton: {
      color: materialTheme.colors.success,
      borderRadius: 20,
      alignItems: "center",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
      width: width * 0.15,
      padding: 3,
    },

    pickerItemStyle: {
      backgroundColor: materialTheme.colors.primary,
      color: materialTheme.colors.white,
      borderRadius: 20,
      height: height * 0.3,
      fontFamily: "Roboto",
    },
  });
};

export default bodyIosStyle;
