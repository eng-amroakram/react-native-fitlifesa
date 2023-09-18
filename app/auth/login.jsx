import React, { useState } from "react";
import materialTheme from "../../constants/Theme";
import translate from "../../lang/localizer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import { Button, Icon, Text, TextField, View } from "react-native-ui-lib";
import loginStyle from "../../assets/styles/login";
import Images from "../../constants/Images";
import { Input } from "galio-framework";
import getNavigator from "../../services/navigators";
import api, { routes } from "../../services/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/auth";
import ToastMessage from "../../constants/Toaster";

const Login = () => {
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //Inputs
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  //validation errors
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //Styles
  const loginStyles = loginStyle(lang);

  //Form
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

  //validate password
  const validatePassword = (password) => {
    const re = /^.+$/;
    return re.test(password);
  };

  const handleLogin = async () => {
    let phone_check = validatePhone(phone)
      ? ""
      : "Please fill in phone number.";
    let password_check = validatePassword(password)
      ? ""
      : "Please fill in password.";

    setPhoneError(phone_check);
    setPasswordError(password_check);

    if (!phone_check && !password_check) {
      let data = {
        phone: phone.replace("+966 ", ""),
        password: password,
      };

      setLoading(true);

      let response = await api.post(routes.auth.login, data, { lang: lang });

      console.log(response);

      if (response.status == 200) {
        let user = response.data.user;

        await AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.setItem("token", user.token);

        dispatch(setUser(user));
        setLoading(false);

        if (user.status == "active") {
          router.push(getNavigator("home"));
          ToastMessage("Login Successfully", "success", lang);
        }

        if (user.status == "inactive") {
          router.push(getNavigator("verify"));
          ToastMessage("Please verify your account", "success", lang);
        }

        //reset inputs
        setPhone("");
        setPassword("");

        //reset errors
        setPhoneError("");
        setPasswordError("");

        setLoading(false);
        return;
      }

      if (response.status == 422) {
        setLoading(false);
        let errors = response.errors;
        if (errors.phone) {
          setPhoneError(errors.phone[0]);
        }
        if (errors.password) {
          setPasswordError(errors.password[0]);
        }

        if (errors.message) {
          ToastMessage(errors.message[0], "error", lang);
        }
      }
    }
  };

  return (
    <View style={loginStyles.container}>
      <StatusBar barStyle="dark-content" />

      <ImageBackground
        source={Images.loginCover}
        resizeMode="cover"
        style={loginStyles.backgroundImage}
      >
        <View style={loginStyles.container}>
          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.titleText}>
              {translate("Login", lang)}
            </Text>

            <View style={loginStyles.form}>
              <View style={loginStyles.formGroup}>
                <Input
                  onLayout={(e) => console.log(e.nativeEvent.layout)}
                  style={loginStyles.formInput}
                  left={false}
                  right={true}
                  textAlign="left"
                  icon="phone"
                  family="Font-Awesome"
                  iconSize={25}
                  iconColor={materialTheme.colors.default}
                  placeholder={translate("Phone Number", lang)}
                  placeholderTextColor={materialTheme.colors.default}
                  maxLength={14}
                  onChangeText={(value) => handlePhoneNumberChange(value)}
                  onFocus={phoneHandleFocus}
                  value={phone}
                  keyboardType="phone-pad"
                  error={phoneError}
                  type="phone-pad"
                />

                <Text style={loginStyles.errorText}>
                  {translate(phoneError, lang)}
                </Text>

                <Input
                  onLayout={(e) => console.log(e.nativeEvent.layout)}
                  style={loginStyles.formInput}
                  color={materialTheme.colors.default}
                  left={false}
                  right={true}
                  textAlign="left"
                  family="entypo"
                  iconSize={20}
                  iconColor={materialTheme.colors.default}
                  placeholder={translate("Password", lang)}
                  placeholderTextColor={materialTheme.colors.default}
                  maxLength={30}
                  onChangeText={(value) => setPassword(value)}
                  value={password}
                  password
                  viewPass
                  error={passwordError}
                  type="default"
                />

                <Text style={loginStyles.errorText}>
                  {translate(passwordError, lang)}
                </Text>

                <View style={loginStyles.formGroup}>
                  <Text
                    style={loginStyles.forgotPasswordText}
                    onPress={() => router.push(getNavigator("forgot"))}
                  >
                    {translate("Forgot Password?", lang)}
                  </Text>
                </View>

                <View style={loginStyles.registerContainer}>
                  <Text
                    style={loginStyles.registerText}
                    onPress={() => router.push(getNavigator("register"))}
                  >
                    {translate("Don't have an account?", lang)}
                  </Text>

                  <Text
                    style={loginStyles.registerTextButton}
                    onPress={() => router.push(getNavigator("register"))}
                  >
                    {translate("Register", lang)}
                  </Text>
                </View>

                {loading ? (
                  <ActivityIndicator
                    size="large"
                    color={materialTheme.colors.success}
                  ></ActivityIndicator>
                ) : (
                  <Button
                    label={translate("Login", lang)}
                    style={loginStyles.formButton}
                    onPress={handleLogin}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
