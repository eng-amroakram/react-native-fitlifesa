import React, { createRef, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";
import materialTheme from "../../constants/Theme";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../constants/Images";
import translate from "../../lang/localizer";
import { TouchableHighlight } from "react-native-gesture-handler";
import { ExpandableOverlay } from "react-native-ui-lib/src/incubator";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import bodyIosStyle from "../../assets/styles/bodyIosStyle";
import { Picker } from "@react-native-picker/picker";
import storage from "../../services/storage";
import ToastMessage from "../../constants/Toaster";
import { router } from "expo-router";
import { routes } from "../../services/routes";
import getNavigator from "../../services/navigators";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "galio-framework";

const deviceType = Platform.OS;

const { height, width } = Dimensions.get("screen");

const BodyIOS = () => {
  //Redux
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //Styles
  const bodyIosStyles = bodyIosStyle(lang);

  //Ref Expandable OverLay
  const expandableOverlayDateRef = createRef();
  const expandableOverlaySexRef = createRef();
  const expandableOverlayHeightRef = createRef();
  const expandableOverlayWeightRef = createRef();

  //Inputs
  const [birthDay, setBirthDay] = useState(new Date());
  const [age, setAge] = useState(15);
  const [sex, setSex] = useState("male");
  const [heightBody, setHeightBody] = useState(200);
  const [weight, setWeight] = useState(80);

  //Handle Birth Day
  const handleBirthDay = useCallback((event, selectedDate) => {
    const currentDate = selectedDate || birthDay;
    setBirthDay(currentDate);
    //calculate age
    const today = new Date();
    const birthDate = new Date(currentDate);
    let agee = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) agee--;
    setAge(agee);
    setBirthDay(currentDate);
  }, []);

  //Handle Continue
  const handleContinue = async () => {
    setLoading(true);

    if ((birthDay.toDateString() && age && heightBody, weight)) {
      await storage.set("birthDay", birthDay.toDateString());
      await storage.set("height", heightBody.toString());
      await storage.set("weight", weight.toString());
      await storage.set("age", age.toString());
      await storage.set("gender", sex);

      router.push(getNavigator("questions"));
      setLoading(false);
    } else {
      ToastMessage("Please Enter Your Body Info", "error", lang);
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={Images.loginCover}
      resizeMode="cover"
      style={bodyIosStyles.imageBackground}
    >
      <SafeAreaView style={bodyIosStyles.safeAreaView}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => router.push(getNavigator("home"))}
            style={{
              marginLeft: 20,
            }}
          >
            <Icon
              name="arrow-left-circle"
              family="Feather"
              size={40}
              color={materialTheme.colors.white}
            />
          </TouchableOpacity>
        </View>

        <View style={bodyIosStyles.container}>
          <View style={bodyIosStyles.contentContainer}>
            <View style={bodyIosStyles.headerContainer}>
              <Text style={bodyIosStyles.headerMiddleText}>
                {translate("Health Details", lang)}
              </Text>
            </View>

            <View style={bodyIosStyles.bodyContainer}>
              <ExpandableOverlay
                ref={expandableOverlayDateRef}
                useDialog
                expandableContent={
                  <View style={bodyIosStyles.expandablePicker}>
                    <View style={bodyIosStyles.expandableDateSpinnerHeader}>
                      <Text style={{ color: materialTheme.colors.success }}>
                        {"Your Age is:  "}
                        {age}
                      </Text>

                      <Text
                        style={bodyIosStyles.doneButton}
                        onPress={() => {
                          expandableOverlayDateRef.current?.closeExpandable();
                        }}
                      >
                        {translate("Done", lang)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RNDateTimePicker
                        shouldRasterizeIOS
                        display="spinner"
                        value={birthDay}
                        onChange={handleBirthDay}
                        mode="date"
                        style={bodyIosStyles.expandableDateSpinner}
                        textColor={materialTheme.colors.placeholder}
                      />
                    </View>
                  </View>
                }
                dialogProps={bodyIosStyles.expandableDateDialog}
              >
                <TouchableHighlight
                  underlayColor={materialTheme.colors.secondary}
                >
                  <View style={bodyIosStyles.rowContainer}>
                    <Text style={bodyIosStyles.rowContainerTextTitle}>
                      {translate("Birth Day", lang)}
                    </Text>
                    <Text style={bodyIosStyles.rowContainerText}>
                      {birthDay.toDateString()}
                    </Text>
                  </View>
                </TouchableHighlight>
              </ExpandableOverlay>

              <ExpandableOverlay
                ref={expandableOverlaySexRef}
                useDialog
                expandableContent={
                  <View style={bodyIosStyles.expandablePicker}>
                    <View style={bodyIosStyles.expandableSexSpinnerHeader}>
                      <Text
                        style={bodyIosStyles.doneButton}
                        onPress={() => {
                          expandableOverlaySexRef.current?.closeExpandable();
                        }}
                      >
                        {translate("Done", lang)}
                      </Text>
                    </View>

                    <Picker
                      selectedValue={sex}
                      onValueChange={(itemValue, itemIndex) =>
                        setSex(itemValue)
                      }
                      style={bodyIosStyles.expandableSexSpinner}
                      itemStyle={bodyIosStyles.pickerItemStyle}
                    >
                      <Picker.Item
                        color={materialTheme.colors.white}
                        label={translate("Male", lang)}
                        value="male"
                      />
                      <Picker.Item
                        color={materialTheme.colors.white}
                        label={translate("Female", lang)}
                        value="female"
                      />
                    </Picker>
                  </View>
                }
                dialogProps={bodyIosStyles.expandableSexDialog}
              >
                <TouchableHighlight
                  underlayColor={materialTheme.colors.secondary}
                >
                  <View style={bodyIosStyles.rowContainer}>
                    <Text style={bodyIosStyles.rowContainerTextTitle}>
                      {translate("Sex", lang)}
                    </Text>
                    <Text style={bodyIosStyles.rowContainerText}>
                      {translate(sex, lang)}
                    </Text>
                  </View>
                </TouchableHighlight>
              </ExpandableOverlay>

              <ExpandableOverlay
                ref={expandableOverlayHeightRef}
                useDialog
                expandableContent={
                  <View style={bodyIosStyles.expandablePicker}>
                    <View style={bodyIosStyles.expandableHeightSpinnerHeader}>
                      <Text style={{ color: materialTheme.colors.success }}>
                        {translate("Your Height is:  ", lang)}
                        {heightBody} {translate(" cm", lang)}
                      </Text>

                      <Text
                        style={bodyIosStyles.doneButton}
                        onPress={() => {
                          expandableOverlayHeightRef.current?.closeExpandable();
                        }}
                      >
                        {translate("Done", lang)}
                      </Text>
                    </View>

                    <Picker
                      selectedValue={heightBody}
                      onValueChange={(itemValue, itemIndex) =>
                        setHeightBody(itemValue)
                      }
                      style={bodyIosStyles.expandableHeightSpinner}
                      itemStyle={bodyIosStyles.pickerItemStyle}
                    >
                      {Array.from(Array(251).keys()).map((item, index) => {
                        if (item > 149) {
                          return (
                            <Picker.Item
                              color={materialTheme.colors.white}
                              label={item.toString() + " cm"}
                              value={item}
                              key={index}
                            />
                          );
                        }
                      })}
                    </Picker>
                  </View>
                }
                dialogProps={bodyIosStyles.expandableHeightDialog}
              >
                <TouchableHighlight
                  underlayColor={materialTheme.colors.secondary}
                >
                  <View style={bodyIosStyles.rowContainer}>
                    <Text style={bodyIosStyles.rowContainerTextTitle}>
                      {translate("Height", lang)}
                    </Text>
                    <Text style={bodyIosStyles.rowContainerText}>
                      {heightBody} {" cm"}
                    </Text>
                  </View>
                </TouchableHighlight>
              </ExpandableOverlay>

              <ExpandableOverlay
                ref={expandableOverlayWeightRef}
                useDialog
                expandableContent={
                  <View style={bodyIosStyles.expandablePicker}>
                    <View style={bodyIosStyles.expandableHeightSpinnerHeader}>
                      <Text style={{ color: materialTheme.colors.success }}>
                        {translate("Your Weight is:  ", lang)}
                        {weight} {translate(" kg", lang)}
                      </Text>

                      <Text
                        style={bodyIosStyles.doneButton}
                        onPress={() => {
                          expandableOverlayWeightRef.current?.closeExpandable();
                        }}
                      >
                        {translate("Done", lang)}
                      </Text>
                    </View>

                    <Picker
                      selectedValue={weight}
                      onValueChange={(itemValue, itemIndex) =>
                        setWeight(itemValue)
                      }
                      style={bodyIosStyles.expandableHeightSpinner}
                      itemStyle={bodyIosStyles.pickerItemStyle}
                    >
                      {Array.from(Array(200).keys()).map((item, index) => {
                        if (item > 40) {
                          return (
                            <Picker.Item
                              color={materialTheme.colors.white}
                              label={item.toString() + " kg"}
                              value={item}
                              key={index}
                            />
                          );
                        }
                      })}
                    </Picker>
                  </View>
                }
                dialogProps={bodyIosStyles.expandableWeightDialog}
              >
                <TouchableHighlight
                  underlayColor={materialTheme.colors.secondary}
                >
                  <View style={bodyIosStyles.lastRowContainer}>
                    <Text style={bodyIosStyles.rowContainerTextTitle}>
                      {translate("Weight", lang)}
                    </Text>
                    <Text style={bodyIosStyles.rowContainerText}>
                      {weight} {" kg"}
                    </Text>
                  </View>
                </TouchableHighlight>
              </ExpandableOverlay>
            </View>

            <View style={bodyIosStyles.footerContainer}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={materialTheme.colors.success}
                ></ActivityIndicator>
              ) : (
                <TouchableHighlight
                  underlayColor={materialTheme.colors.success}
                  style={bodyIosStyles.footerButton}
                  onPress={handleContinue}
                >
                  <Text style={bodyIosStyles.footerButtonText}>
                    {translate("Continue", lang)}
                  </Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default BodyIOS;
