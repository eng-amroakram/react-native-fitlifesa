import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { routes } from "../../services/routes";
import materialTheme from "../../constants/Theme";
import { useSelector } from "react-redux";
import translate from "../../lang/localizer";
import { Button } from "galio-framework";
import getNavigator from "../../services/navigators";

export default function IntroVideo() {
  const video = useRef(null);
  const router = useRouter();
  const lang = useSelector((state) => state.lang.lang);

  const handleSkip = () => {
    video.current.pauseAsync();
    router.push(getNavigator("bodyIOS"));
  };

  return (
    <SafeAreaView style={introVideoStyles.screen}>
      <View style={introVideoStyles.container}>
        <Video
          ref={video}
          style={introVideoStyles.video}
          source={{
            uri: routes.auth.video,
          }}
          useNativeControls={true}
          shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={true}
        />
        <Button
          style={introVideoStyles.skipButton}
          onPress={handleSkip}
          ssss
          color={materialTheme.colors.success}
          variant="outline"
        >
          <Text style={introVideoStyles.skipButtonText}>
            {translate("skip", lang)}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const introVideoStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: materialTheme.colors.primary,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },

  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  skipButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 100,
    height: 50,
    borderRadius: 10,
    shadowRadius: 0,
    shadowOpacity: 0,
  },

  skipButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
