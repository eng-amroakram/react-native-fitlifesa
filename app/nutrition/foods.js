import React, { useEffect } from "react";
import { ScrollView, StatusBar, StyleSheet } from "react-native";
import {
  Button,
  Image,
  LoaderScreen,
  ScrollBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";
import Images from "../../constants/Images";
import materialTheme from "../../constants/Theme";
import { Input } from "galio-framework";
import { useState } from "react";
import foodsStyle from "../../assets/styles/foods";
import CustomTabBar from "../../components/Tab";
import translate from "../../lang/localizer";
import api, { routes } from "../../services/routes";
import storage from "../../services/storage";
import { useSelector } from "react-redux";

const Foods = () => {
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const foodsStyles = foodsStyle(lang);

  const [foodType, setFoodType] = useState("");
  const [search, setSearch] = useState(" ");

  const [foodExchanges, setFoodExchanges] = useState([]);

  useEffect(() => {
    setLoading(true);

    console.log(auth);

    const getFoods = async () => {
      let token = await storage.get("token");
      let lang = await storage.get("lang");

      console.log(lang);

      let url = routes.nutrition.foods + "/" + foodType;

      let response = await api.get(url, {
        token: token,
        lang: lang,
        query: "?search=" + search || " ",
      });

      if (response.status == 200) {
        setFoodExchanges(response.data);
        setLoading(false);
      } else {
        setLoading(false);
        console.log(response);
      }
    };

    getFoods();
  }, [foodType, search]);

  return (
    <View style={foodsStyles.container}>
      <CustomTabBar />

      <View style={foodsStyles.macrosInfoContainer}>
        <View style={foodsStyles.macrosInfo}>
          <Text style={foodsStyles.macrosInfoTitle}>
            {translate("Calories", lang)}
          </Text>
          <View style={foodsStyles.macrosTexts}>
            <Text style={foodsStyles.macrosInfoValue}>
              {auth?.user?.body?.calories}
            </Text>
            {/* <Text style={foodsStyles.macrosInfoValue}>GM</Text> */}
          </View>
        </View>

        <View style={foodsStyles.macrosInfo}>
          <Text style={foodsStyles.macrosInfoTitle}>
            {translate("Protein", lang)}
          </Text>
          <View style={foodsStyles.macrosTexts}>
            <Text style={foodsStyles.macrosInfoValue}>
              {auth?.user?.body?.protein_gram}
            </Text>
            <Text style={foodsStyles.macrosInfoValue}>GM</Text>
          </View>
        </View>

        <View style={foodsStyles.macrosInfo}>
          <Text style={foodsStyles.macrosInfoTitle}>
            {translate("Fat", lang)}
          </Text>
          <View style={foodsStyles.macrosTexts}>
            <Text style={foodsStyles.macrosInfoValue}>
              {auth?.user?.body?.fats_gram}
            </Text>
            <Text style={foodsStyles.macrosInfoValue}>GM</Text>
          </View>
        </View>

        <View style={foodsStyles.macrosInfo}>
          <Text style={foodsStyles.macrosInfoTitle}>
            {translate("Carbs", lang)}
          </Text>
          <View style={foodsStyles.macrosTexts}>
            <Text style={foodsStyles.macrosInfoValue}>
              {auth?.user?.body?.carbs_gram}
            </Text>
            <Text style={foodsStyles.macrosInfoValue}>GM</Text>
          </View>
        </View>
      </View>

      <View style={foodsStyles.scrollBarContainer}>
        <ScrollBar
          indicatorStyle={{ backgroundColor: materialTheme.colors.red }}
          endFillColor={materialTheme.colors.red}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          gradientColor="transparent"
          containerStyle={{ backgroundColor: "transparent" }}
        >
          <View
            style={{ flexDirection: lang === "ar" ? "row-reverse" : "row" }}
          >
            <Button
              label={translate("All", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("")}
            />

            <Button
              label={translate("Starches", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("starch")}
            />
            <Button
              label={translate("Fruits", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("fruit")}
            />
            <Button
              label={translate("Vegetables", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("vegetable")}
            />
            <Button
              label={translate("Meat", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("meat")}
            />
            <Button
              label={translate("Fats", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("fat")}
            />
            <Button
              label={translate("Dairy", lang)}
              labelStyle={foodsStyles.buttonText}
              style={foodsStyles.buttonScrollBar}
              onPress={() => setFoodType("dairy")}
            />
          </View>
        </ScrollBar>
      </View>

      <View
        style={{
          marginTop: 20,
          width: "90%",
          backgroundColor: materialTheme.colors.nutrition,
          paddingHorizontal: 15,
          borderRadius: 10,
          height: "65%",
          paddingBottom: 20,
        }}
      >
        <Input
          placeholder={translate("Search ...", lang)}
          placeholderTextColor={materialTheme.colors.black}
          textAlign={lang === "ar" ? "right" : "left"}
          onChangeText={(text) => setSearch(text)}
          style={{
            height: 40,
            fontSize: 14,
            backgroundColor: materialTheme.colors.white,
            borderRadius: 5,
            fontFamily: "RobotoBold",
          }}
        />

        <View
          style={{
            flexDirection: lang === "ar" ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: lang === "ar" ? "row-reverse" : "row" }}
          >
            <Text style={{ fontFamily: "RobotoBold", fontSize: 14 }}>
              {foodExchanges.length}
            </Text>

            <Text style={{ fontFamily: "RobotoBold", fontSize: 14 }}>
              {"  "} {translate(foodType.toUpperCase(), lang)}
              {"  "}
            </Text>
          </View>
        </View>
        {loading ? (
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <LoaderScreen
              message={translate("Loading Food ...", lang)}
              color={materialTheme.colors.success}
            />
          </View>
        ) : foodExchanges.length == 0 ? (
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontFamily: "RobotoBold", fontSize: 14 }}>
              No Foods Found
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginTop: 0,
            }}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
          >
            {foodExchanges.map((item, index) => {
              return (
                <TouchableOpacity style={foodsStyles.card} key={index}>
                  <View
                    style={{
                      flexDirection: lang === "ar" ? "row-reverse" : "row",
                    }}
                  >
                    <Image
                      source={Images.foodsImage}
                      fadeDuration={0}
                      style={foodsStyles.cardImage}
                    />

                    <View
                      style={{
                        marginLeft: lang === "ar" ? 0 : 10,
                        marginRight: lang === "ar" ? 10 : 0,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={foodsStyles.cardTitle}>{item.title}</Text>
                      <View
                        style={{
                          flexDirection: lang === "ar" ? "row-reverse" : "row",
                        }}
                      >
                        <Text style={foodsStyles.cardText}>Bread</Text>
                        <Text style={foodsStyles.cardText}>Cereal</Text>
                        <Text style={foodsStyles.cardText}>Crackers</Text>
                        <Text style={foodsStyles.cardText}>Pasta</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>

      {/* count of array length  */}
    </View>
  );
};

export default Foods;
