import React, { useState } from "react";
import { Checkbox, Text, View } from "react-native-ui-lib";
import registerStyle from "../../assets/styles/register";
import Images from "../../constants/Images";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StatusBar,
} from "react-native";
import translate from "../../lang/localizer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { Input } from "galio-framework";
import materialTheme from "../../constants/Theme";
import { Button } from "react-native-ui-lib";
import ToastMessage from "../../constants/Toaster";
import getNavigator from "../../services/navigators";
import api, { routes } from "../../services/routes";
import { setUser } from "../../redux/slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  //Redux
  const auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  //Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+966 ");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  //validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const registerStyles = registerStyle(lang);
  const [loading, setLoading] = useState(false);

  //Router Expo
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

  //validate password
  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async () => {
    let name_check = name == "" ? "Please fill in name" : "";
    let email_check = email == "" ? "Please fill in email" : "";
    let phone_check = validatePhone(phone) ? "" : "Please fill in phone number";
    let password_check = password ? "" : "Please fill in password";
    let terms_check = terms ? "" : "Please agree to terms and conditions";

    setNameError(name_check);
    setEmailError(email_check);
    setPhoneError(phone_check);
    setPasswordError(password_check);
    setTermsError(terms_check);

    if (!terms) {
      ToastMessage("Please agree to terms and conditions", "error", lang);
    }

    if (
      !name_check &&
      !email_check &&
      !phone_check &&
      !password_check &&
      terms
    ) {
      let data = {
        name: name,
        email: email,
        phone: phone.replace("+966 ", ""),
        password: password,
      };

      setLoading(true);

      let response = await api.post(routes.auth.register, data, { lang: lang });

      if (response.status == 201 || response.status == "201") {
        let user = response.data.user;

        dispatch(setUser(user));
        await AsyncStorage.setItem("token", user.token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setLoading(false);
        ToastMessage("Register successfully", "success", lang);

        if (user.status == "inactive") {
          setTimeout(() => {
            router.push(getNavigator("verify"));
            setLoading(false);
          }, 1000);
        }

        if (user.status == "active") {
          setTimeout(() => {
            router.push(getNavigator("intro"));
            setLoading(false);
          }, 1000);
        }

        //reset inputs
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setTerms(false);
        setLoading(false);
      }

      if (response.status == 422 || response.status == "422") {
        setLoading(false);
        ToastMessage("Register failed", "error", lang);

        let errors = response.errors;

        if (errors.name) {
          setNameError(errors.name[0]);
        }

        if (errors.email) {
          setEmailError(errors.email[0]);
        }

        if (errors.phone) {
          setPhoneError(errors.phone[0]);
        }

        if (errors.password) {
          setPasswordError(errors.password[0]);
        }

        if (errors.password_confirmation) {
          setPasswordConfirmationError(errors.password_confirmation[0]);
        }
      }
    }
  };

  return (
    <ScrollView>
      <View style={registerStyles.container}>
        <StatusBar barStyle="light-content" />

        <ImageBackground
          source={Images.loginCover}
          resizeMode="cover"
          style={registerStyles.backgroundImage}
        >
          <View style={registerStyles.container}>
            <View style={registerStyles.formContainer}>
              <Text style={registerStyles.titleText}>
                {translate("Register", lang)}
              </Text>

              <View style={registerStyles.form}>
                <View style={registerStyles.formGroup}>
                  <Input
                    onLayout={(e) => console.log(e.nativeEvent.layout)}
                    style={registerStyles.formInput}
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
                  />
                  <Text style={registerStyles.errorText}>
                    {translate(nameError, lang)}
                  </Text>

                  <Input
                    onLayout={(e) => console.log(e.nativeEvent.layout)}
                    style={registerStyles.formInput}
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
                  />
                  <Text style={registerStyles.errorText}>
                    {translate(emailError, lang)}
                  </Text>

                  <Input
                    onLayout={(e) => console.log(e.nativeEvent.layout)}
                    style={registerStyles.formInput}
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
                  />
                  <Text style={registerStyles.errorText}>
                    {translate(phoneError, lang)}
                  </Text>

                  <Input
                    onLayout={(e) => console.log(e.nativeEvent.layout)}
                    style={registerStyles.formInput}
                    left={false}
                    right={true}
                    textAlign="left"
                    family="entypo"
                    iconSize={20}
                    iconColor={materialTheme.colors.placeholder}
                    placeholder={translate("Password", lang)}
                    placeholderTextColor={materialTheme.colors.placeholder}
                    maxLength={30}
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    password
                    viewPass
                    error={passwordError}
                    type="default"
                  />
                  <Text style={registerStyles.errorText}>
                    {translate(passwordError, lang)}
                  </Text>

                  <View style={registerStyles.termsContainer}>
                    <Checkbox
                      value={terms}
                      onValueChange={(value) => setTerms(value)}
                      color={materialTheme.colors.success}
                    />
                    <Text style={registerStyles.termsText}>
                      {translate("I agree to the", lang)}
                    </Text>
                    <Text
                      style={registerStyles.termsLink}
                      onPress={() => router.push(getNavigator("terms"))}
                    >
                      {translate("Terms and Conditions", lang)}
                    </Text>
                  </View>

                  {/* login if you have an account */}

                  <View style={registerStyles.loginContainer}>
                    <Text style={registerStyles.loginText}>
                      {translate("Already have an account?", lang)}
                    </Text>
                    <Text
                      style={registerStyles.loginLink}
                      onPress={() => router.push(getNavigator("login"))}
                    >
                      {translate("Login", lang)}
                    </Text>
                  </View>

                  {loading ? (
                    <ActivityIndicator
                      size="large"
                      color={materialTheme.colors.success}
                    ></ActivityIndicator>
                  ) : (
                    <Button
                      label={translate("Register", lang)}
                      style={registerStyles.formButton}
                      onPress={handleRegister}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default Register;
