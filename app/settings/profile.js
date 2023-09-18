import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Icon, Input } from "galio-framework";
import { Button, Text, TouchableOpacity, View } from "react-native-ui-lib";

import * as ImagePicker from "expo-image-picker";

import materialTheme from "../../constants/Theme";
import translate from "../../lang/localizer";
import { useDispatch, useSelector } from "react-redux";
import Images, { userApiImage } from "../../constants/Images";
import profileStyle from "../../assets/styles/profile";
import { useRouter } from "expo-router";
import getNavigator from "../../services/navigators";
import axios from "axios";
import api, { baseUrl, routes } from "../../services/routes";
import storage from "../../services/storage";
import ToastMessage from "../../constants/Toaster";
import { setUser } from "../../redux/slices/auth";

const { height, width } = Dimensions.get("screen");

const Profile = () => {
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userImage = userApiImage();

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [loading, setLoading] = useState(false);
  const profileStyles = profileStyle(lang);

  const router = useRouter();

  const handlePhoneNumberChange = (value) => {
    let phone = value.replace("+966 ", "");
    let numericValue = "";
    if (phone) {
      numericValue = "+966 " + phone.replace(/\D/g, "");
    }
    setPhone(numericValue);
  };

  const phoneHandleFocus = () => {
    setPhone("+966 " + phone.replace("+966 ", ""));
  };

  //validate phone number
  const validatePhone = (phone) => {
    const re = /^\+966 \d{9}$/;
    return re.test(phone);
  };

  // Function to open the image picker
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    // Set the selected image
    setImage({
      uri: pickerResult.assets[0].uri ?? "null",
      name: pickerResult.assets[0].fileName,
      type: pickerResult.assets[0].type,
    });
  };

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPhone("+966 " + auth.user.phone);
      setImage(userImage);
    }
  }, []);

  const handleRegister = async () => {
    let name_check = name == "" ? "Please fill in name" : "";
    let email_check = email == "" ? "Please fill in email" : "";
    let phone_check = validatePhone(phone) ? "" : "Please fill in phone number";

    setNameError(name_check);
    setEmailError(email_check);
    setPhoneError(phone_check);

    if (!name_check && !email_check && !phone_check) {
      setLoading(true);

      const form = new FormData();

      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone.replace("+966 ", ""));
      form.append("image", image);

      let token = await storage.get("token");
      let url = baseUrl + routes.profile.update + "?lang=" + lang;

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Language": lang || "en",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.post(url, form, config);

        if (response.data.status == 200) {
          let user = response.data.data;
          dispatch(setUser(user));
          setLoading(false);
          ToastMessage("Profile updated successfully", "success",lang);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    }
  };

  return (
    <ImageBackground source={Images.loginCover} style={profileStyles.image}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => router.push(getNavigator("home"))}
          style={{ margin: 20 }}
        >
          <Icon
            name="arrowleft"
            family="AntDesign"
            size={30}
            color={materialTheme.colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={profileStyles.container}>
        <Text style={profileStyles.titleText}>
          {translate("Your Profile", lang)}
        </Text>

        <TouchableOpacity
          onPress={selectImage}
          style={profileStyles.profileImageContainer}
        >
          {image ? (
            <Image
              source={image}
              resizeMode="cover"
              style={profileStyles.profileImage}
            />
          ) : (
            <Icon name="user" family="AntDesign" size={110} color="#C4C4C4" />
          )}
        </TouchableOpacity>

        <Input
          onLayout={(e) => console.log(e.nativeEvent.layout)}
          style={profileStyles.formInput}
          left={lang == "ar" ? true : false}
          right={lang == "ar" ? false : true}
          textAlign={lang == "ar" ? "right" : "left"}
          icon="edit"
          family="Font-Awesome"
          iconSize={20}
          iconColor={materialTheme.colors.placeholder}
          placeholderTextColor={materialTheme.colors.placeholder}
          placeholder={translate("Your Name", lang)}
          maxLength={14}
          onChangeText={(value) => setName(value)}
          value={name}
          error={nameError}
          type="default"
          color="white"
        />

        <Text style={profileStyles.errorText}>
          {translate(nameError, lang)}
        </Text>

        <Input
          onLayout={(e) => console.log(e.nativeEvent.layout)}
          style={profileStyles.formInput}
          left={false}
          right={true}
          textAlign="left"
          icon="at"
          family="Font-Awesome"
          iconSize={20}
          iconColor={materialTheme.colors.placeholder}
          placeholder={translate("Your Email", lang)}
          placeholderTextColor={materialTheme.colors.placeholder}
          maxLength={35}
          onChangeText={(value) => setEmail(value)}
          value={email}
          error={emailError}
          type="email-address"
          color="white"
        />

        <Text style={profileStyles.errorText}>
          {translate(emailError, lang)}
        </Text>

        <Input
          onLayout={(e) => console.log(e.nativeEvent.layout)}
          style={profileStyles.formInput}
          left={false}
          right={true}
          textAlign="left"
          icon="phone"
          family="Font-Awesome"
          iconSize={25}
          iconColor={materialTheme.colors.placeholder}
          placeholder={translate("Phone Number", lang)}
          placeholderTextColor={materialTheme.colors.placeholder}
          maxLength={14}
          onChangeText={handlePhoneNumberChange}
          onFocus={phoneHandleFocus}
          value={phone}
          keyboardType="phone-pad"
          error={phoneError}
          type="phone-pad"
          returnKeyType="done"
          color="white"
        />
        <Text style={profileStyles.errorText}>
          {translate(phoneError, lang)}
        </Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={materialTheme.colors.success}
            style={{ marginTop: 20 }}
          ></ActivityIndicator>
        ) : (
          <Button
            label={translate("Update", lang)}
            style={profileStyles.formButton}
            onPress={handleRegister}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Profile;
