import React from "react";
import { StatusBar } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native-ui-lib";
import Images from "../constants/Images";
import homeStyle from "../assets/styles/home";
import { useSelector } from "react-redux";
import translate from "../lang/localizer";
import { useRouter } from "expo-router";
import getNavigator from "../services/navigators";

const Home = () => {
  //Redux
  const lang = useSelector((state) => state.lang.lang);
  const auth = useSelector((state) => state.auth);

  const router = useRouter();

  //Styles
  const homeStyles = homeStyle(lang);

  return (
    <View style={homeStyles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={homeStyles.headerScreen}>
        <View style={homeStyles.leftHeader}>
          <Text style={homeStyles.userName}>{auth?.user?.name}</Text>
          <Text style={homeStyles.dateText}>{new Date().toDateString()}</Text>
        </View>

        <View style={homeStyles.rightHeader}>
          {lang === "ar" ? (
            <Image
              source={{ uri: Images.specialOffers }}
              style={homeStyles.specialOffersIcon}
            />
          ) : null}

          <Text style={homeStyles.specialOffersText}>
            {translate("Special Offers", lang)}
          </Text>

          {lang === "en" ? (
            <Image
              source={{ uri: Images.specialOffers }}
              style={homeStyles.specialOffersIcon}
            />
          ) : null}
        </View>
      </View>

      <View style={homeStyles.servicesSection}>
        {/* nutrition section */}
        <TouchableOpacity onPress={() => router.push(getNavigator("foods"))}>
          <View style={homeStyles.nutritionSectionCard}>
            {lang === "ar" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupNutrition }}
                  style={homeStyles.nutritionSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.nutritionSectionCardText}>
              <Text style={homeStyles.nutritionSectionCardTextTitle}>
                {translate("Nutrition", lang)}
              </Text>

              <Text style={homeStyles.nutritionSectionCardTextSubTitle}>
                {translate(
                  "Meal Plan, Food Exchange List, Food Diary, Tips",
                  lang
                )}
              </Text>
            </View>

            {lang === "en" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupNutrition }}
                  style={homeStyles.nutritionSectionCardIcon}
                />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* exercises section */}
        <TouchableOpacity>
          <View style={homeStyles.exercisesSectionCard}>
            {lang === "ar" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupExercises }}
                  style={homeStyles.exercisesSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.exercisesSectionCardText}>
              <Text style={homeStyles.exercisesSectionCardTextTitle}>
                {translate("Exercises", lang)}
              </Text>
              <Text style={homeStyles.exercisesSectionCardTextSubTitle}>
                {translate(
                  "Workout Plan, Workout Diary, Tips, Videos, Exercises, Body, BMI",
                  lang
                )}
              </Text>
            </View>

            {lang === "en" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupExercises }}
                  style={homeStyles.exercisesSectionCardIcon}
                />
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* services section */}
        <TouchableOpacity>
          <View style={homeStyles.servicesSectionCard}>
            {lang === "ar" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupServices }}
                  style={homeStyles.servicesSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.servicesSectionCardText}>
              <Text style={homeStyles.servicesSectionCardTextTitle}>
                {translate("Services", lang)}
              </Text>
              <Text style={homeStyles.servicesSectionCardTextSubTitle}>
                {translate("Coming Soon", lang)}
              </Text>
            </View>

            {lang === "en" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupServices }}
                  style={homeStyles.servicesSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.overlay}>
              <Text style={homeStyles.overlayText}>
                {translate("Coming Soon", lang)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* specialists section */}
        <TouchableOpacity>
          <View style={homeStyles.specialistsSectionCard}>
            {lang === "ar" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupSpecialists }}
                  style={homeStyles.specialistsSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.specialistsSectionCardText}>
              <Text style={homeStyles.specialistsSectionCardTextTitle}>
                {translate("Specialists", lang)}
              </Text>

              <Text style={homeStyles.specialistsSectionCardTextSubTitle}>
                {translate("Coming Soon", lang)}
              </Text>
            </View>

            {lang === "en" ? (
              <View>
                <Image
                  resizeMode="contain"
                  source={{ uri: Images.groupSpecialists }}
                  style={homeStyles.specialistsSectionCardIcon}
                />
              </View>
            ) : null}

            <View style={homeStyles.overlay}>
              <Text style={homeStyles.overlayText}>
                {translate("Coming Soon", lang)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
