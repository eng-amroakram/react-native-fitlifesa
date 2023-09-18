import { useSelector } from "react-redux";

const Onboarding = require("../assets/images/on-boarding.png");
const baseUrl = "https://fitlifesa.co/mobile/images/";
const baseUrll = "https://fitlifesa.co/storage/";

const splash = require("../assets/images/splash.png");
// const loginCover = baseUrl + "login-cover.png";
const loginCover = require("../assets/images/login-cover.png");
const speedMeter = require("../assets/images/speed-meter.png");
const calories = require("../assets/images/calories.png");
const carb = require("../assets/images/carb.png");
const fat = require("../assets/images/fat.png");
const man = require("../assets/images/man.png");
const checkMark = require("../assets/images/check-mark.png");
const profile = require("../assets/images/profile.png");

const headerDrawer = baseUrl + "header_2.png";
const specialOffers = baseUrl + "special-offers.png";
const groupNutrition = baseUrl + "group-nutrition.png";
const groupExercises = baseUrl + "group-exercises.png";
const groupServices = baseUrl + "group-services.png";
const groupSpecialists = baseUrl + "group-specialists.png";

export const userApiImage = () => {
  const auth = useSelector((state) => state.auth);

  return auth?.user?.image ? { uri: baseUrll + auth?.user?.image } : man;
};

export default {
  Onboarding,
  splash,
  loginCover,
  speedMeter,
  calories,
  carb,
  fat,
  profile,
  checkMark,
  headerDrawer,
  specialOffers,
  groupNutrition,
  groupExercises,
  groupServices,
  groupSpecialists,
};
