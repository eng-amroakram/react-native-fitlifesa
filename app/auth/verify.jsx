import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/auth";
import { useRouter } from "expo-router";
import Images from "../../constants/Images";
import getNavigator from "../../services/navigators";
import ToastMessage from "../../constants/Toaster";

import materialTheme from "../../constants/Theme";
import translate from "../../lang/localizer";
import api, { routes } from "../../services/routes";
import storage from "../../services/storage";
import { Button, Text, View } from "react-native-ui-lib";
import verifyStyle from "../../assets/styles/verify";
import { Input } from "galio-framework";

const { height, width } = Dimensions.get("screen");

const Verify = () => {
  //Timer
  const [remainingTime, setRemainingTime] = useState(3);
  const [timerStarted, setTimerStarted] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //Redux
  const auth = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.lang.lang);
  const dispatch = useDispatch();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //Router
  const router = useRouter();

  //Style
  const verifyStyles = verifyStyle(lang);

  //listen to setCode changes
  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    } else {
      setTimerStarted(false);
    }
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendOTP = async () => {
    setRemainingTime(3);
    setTimerStarted(true);
    setIsLoading(true);

    if (!auth?.user?.phone) {
      await storage.get("user").then((user) => {
        if (user) {
          dispatch(setUser(user));
        }
      });
    }

    const data = {
      phone: auth?.user?.phone,
    };

    const response = await api.post(routes.auth.resendSmsOtp, data, {
      lang: lang,
    });

    setIsLoading(false);
    console.log(isLoading);
    if (response.status == 200 || response.status == "200") {
      ToastMessage("Code sent successfully", "success", lang);
    }

    if (response.status == 422 || response.status == "422") {
      if (response.errors.phone) {
        ToastMessage(response.errors.phone[0], "error", lang);
      }
    }
  };

  const handleCodeChange = (value) => {
    if (value.length === 5) {
      setCodeError("");
      setButtonDisabled(false);
    } else {
      setCodeError("Please fill in code");
      setButtonDisabled(true);
    }
    setCode(value);
  };

  const codeHandleFocus = () => {
    setCode("");
  };

  const validateCode = (code) => {
    const re = /^\d{5}$/;
    return re.test(code);
  };

  const handleVerify = async () => {
    if (!validateCode(code)) {
      setCodeError("Please fill in code");
      ToastMessage("Please fill in code", "error", lang);
      return;
    }

    const data = {
      phone: auth?.user?.phone,
      otp_code: code,
    };

    setIsLoading(true);

    const response = await api.post(routes.auth.verify, data, { lang: lang });

    console.log(response);

    if (response.status == 200 || response.status == "200") {
      dispatch(setUser(response.data.user));
      await storage.set("user", JSON.stringify(response.data.user));
      ToastMessage("Verified Successfully", "success", lang);
      router.push(getNavigator("intro"));
      setIsLoading(false);
    }

    if (response.status == 422 || response.status == "422") {
      if (response.errors) {
        if (response.errors.otp_code) {
          ToastMessage(response.errors.otp_code[0], "error", lang);
        }

        if (response.errors.phone) {
          ToastMessage("Please fill in phone number", "error", lang);
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={verifyStyles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={Images.loginCover}
        style={verifyStyles.imageBackground}
      >
        <View style={verifyStyles.contentContainer}>
          <Text style={verifyStyles.title}>
            {translate("Verify your phone number", lang)}
          </Text>
          <Text style={verifyStyles.subTitle}>
            {translate("Please enter the 5-digit code sent to you at", lang)}{" "}
            {auth?.user?.phone}
          </Text>

          <Input
            placeholder="xxxx"
            placeholderTextColor={materialTheme.colors.default}
            style={verifyStyles.inputCode}
            textAlign="center"
            icon="lock"
            family="antdesign"
            iconSize={20}
            iconColor={materialTheme.colors.white}
            maxLength={5}
            cursorColor={materialTheme.colors.success}
            onChangeText={handleCodeChange}
            onFocus={codeHandleFocus}
            value={code}
            keyboardAppearance="dark"
            returnKeyType="done"
            keyboardType="numeric"
            error={codeError}
          />
          <Text style={verifyStyles.error}>{codeError}</Text>

          {timerStarted ? (
            <Text style={verifyStyles.subTitle}>
              {translate("Resend in", lang)} {formatTime(remainingTime)}
            </Text>
          ) : (
            <Text style={verifyStyles.subTitle}>
              {translate("Didn't receive the code?", lang)}{" "}
              <Text
                style={{
                  color: materialTheme.colors.success,
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                }}
                onPress={handleResendOTP}
              >
                {translate("Resend", lang)}
              </Text>
            </Text>
          )}

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={materialTheme.colors.success}
            ></ActivityIndicator>
          ) : (
            <Button
              label={translate("Verify", lang)}
              onPress={handleVerify}
              disabled={buttonDisabled}
              style={{
                backgroundColor: materialTheme.colors.success,
                width: width * 0.5,
                marginBottom: 20,
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Verify;
