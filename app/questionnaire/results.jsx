import React, { useState } from "react";
import { ActivityIndicator, ImageBackground, ScrollView } from "react-native";
import { Button, Image, Text, View } from "react-native-ui-lib";
import resultsStyle from "../../assets/styles/results";
import { useSelector } from "react-redux";
import Images from "../../constants/Images";
import translate from "../../lang/localizer";
import materialTheme from "../../constants/Theme";
import { useRouter } from "expo-router";
import getNavigator from "../../services/navigators";

const Results = () => {
  //Redux
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);

  const resultsStyles = resultsStyle(lang);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const save = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(getNavigator("home"));
    }, 1000);
  };

  return (
    <ImageBackground
      source={Images.loginCover}
      style={resultsStyles.imageBackground}
    >
      {/* header texts */}
      <View style={resultsStyles.headerTexts}>
        <Text style={resultsStyles.title}>
          {translate("Your results", lang)}
        </Text>
        <Text style={resultsStyles.subtitle}>
          {translate(
            "Results are determined based on your health information",
            lang
          )}
        </Text>
      </View>

      <ScrollView style={resultsStyles.scrollView}>
        <View style={resultsStyles.container}>
          {/* card info */}

          <View style={resultsStyles.card}>
            <View style={resultsStyles.cardHeader}>
              <Text style={resultsStyles.cardTitle}>
                {translate("Your Body Information", lang)}
              </Text>
            </View>

            <View style={resultsStyles.cardBody}>
              <View style={resultsStyles.cardBodyTexts}>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Body Mass Index: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.BMI}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Ideal Body Mass: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.IBM}
                    {" )"}
                  </Text>
                </Text>
              </View>

              <Image
                source={Images.speedMeter}
                style={resultsStyles.cardImage}
                resizeMode="contain"
              />
            </View>

            <View style={resultsStyles.cardFooter}>
              <Text style={resultsStyles.cardFooterTextTitle}>
                {translate("Your Body: ", lang)}
                <Text style={resultsStyles.cardFooterTextResult}>
                  {"  ( "}
                  {auth?.user?.body?.BMI_status}
                  {" )"}
                </Text>
              </Text>
            </View>
          </View>

          <View style={resultsStyles.card}>
            <View style={resultsStyles.cardHeader}>
              <Text style={resultsStyles.cardTitle}>
                {translate("Your Calories", lang)}
              </Text>
            </View>

            <View style={resultsStyles.cardBody}>
              <View style={resultsStyles.cardBodyTexts}>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Daily Calories: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.calories}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Max Daily Calories: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.max_calories}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Min Daily Calories: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.min_calories}
                    {" )"}
                  </Text>
                </Text>
              </View>

              <Image
                source={Images.calories}
                style={resultsStyles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={resultsStyles.card}>
            <View style={resultsStyles.cardHeader}>
              <Text style={resultsStyles.cardTitle}>
                {translate("Your Macros Nutrients In Calories", lang)}
              </Text>
            </View>

            <View style={resultsStyles.cardBody}>
              <View style={resultsStyles.cardBodyTexts}>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Protein: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.protein_calories}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Carbs: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.carbs_calories}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Fat: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.fats_calories}
                    {" )"}
                  </Text>
                </Text>
              </View>

              <Image
                source={Images.carb}
                style={resultsStyles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={resultsStyles.card}>
            <View style={resultsStyles.cardHeader}>
              <Text style={resultsStyles.cardTitle}>
                {translate("Your Macros Nutrients In Grams", lang)}
              </Text>
            </View>

            <View style={resultsStyles.cardBody}>
              <View style={resultsStyles.cardBodyTexts}>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Protein: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.protein_gram}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Carbs: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.carbs_gram}
                    {" )"}
                  </Text>
                </Text>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Fat: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.fats_gram}
                    {" )"}
                  </Text>
                </Text>
              </View>

              <Image
                source={Images.carb}
                style={resultsStyles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={resultsStyles.card}>
            <View style={resultsStyles.cardHeader}>
              <Text style={resultsStyles.cardTitle}>
                {translate("Your Body Percentages", lang)}
              </Text>
            </View>

            <View style={resultsStyles.cardBody}>
              <View style={resultsStyles.cardBodyTexts}>
                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Fats Percentage: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.fats_percent}
                    {"% )"}
                  </Text>
                </Text>

                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Carbs Percentage: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.carbs_percent}
                    {"% )"}
                  </Text>
                </Text>

                <Text style={resultsStyles.cardBodyTextTitle}>
                  {translate("Protein Percentage: ", lang)}{" "}
                  <Text style={resultsStyles.cardBodyTextResult}>
                    {"( "}
                    {auth?.user?.body?.protein_percent}
                    {"% )"}
                  </Text>
                </Text>
              </View>

              <Image
                source={Images.fat}
                style={resultsStyles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Button */}

          <View style={resultsStyles.buttonContainer}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color={materialTheme.colors.success}
              ></ActivityIndicator>
            ) : (
              <Button
                label={translate("Go to Home", lang)}
                style={resultsStyles.button}
                labelStyle={resultsStyles.buttonText}
                onPress={save}
              ></Button>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Results;
