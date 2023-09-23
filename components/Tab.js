import { StyleSheet } from "react-native";
import { Image, TouchableOpacity, View } from "react-native-ui-lib";
import Images from "../constants/Images";
import { useRouter } from "expo-router";
import getNavigator from "../services/navigators";

const Tap = ({ image, activeImage, onPress, active }) => {
  return (
    <TouchableOpacity style={tabsStyles.tab} onPress={onPress}>
      <Image
        source={active ? activeImage : image}
        fadeDuration={0}
        style={{ width: 83.5, height: 60 }}
      />
    </TouchableOpacity>
  );
};

const CustomTabBar = () => {
  
  const router = useRouter();

  return (
    <View style={tabsStyles.tabBar}>
      {Tap({
        image: Images.foodsImage,
        activeImage: Images.foodsImageActive,
        onPress: () => router.push(getNavigator('foods')),
        active: false,
      })}
      {Tap({
        image: Images.plansImage,
        activeImage: Images.plansImageActive,
        onPress: () => console.log("Plans"),
        active: false,
      })}
      {Tap({
        image: Images.appleImage,
        activeImage: Images.appleImageActive,
        onPress: () => console.log("Apple"),
        active: false,
      })}
      {Tap({
        image: Images.performanceImage,
        activeImage: Images.performanceImageActive,
        onPress: () => console.log("Performance"),
        active: false,
      })}
      {Tap({
        image: Images.tipsImage,
        activeImage: Images.tipsImageActive,
        onPress: () => console.log("Tips"),
        active: false,
      })}
    </View>
  );
};

export default CustomTabBar;

const tabsStyles = StyleSheet.create({
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
