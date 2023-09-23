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
const mail = require("../assets/images/mail.png");

const tipsImage = require("../assets/images/nutrition/tips-image.png");
const tipsImageActive = require("../assets/images/tips-image-active.png");

const performanceImage = require("../assets/images/nutrition/performance-image.png");
const performanceImageActive = require("../assets/images/performance-image-active.png");

const foodsImage = require("../assets/images/nutrition/foods-image.png");
const foodsImageActive = require("../assets/images/foods-image-active.png");

const plansImage = require("../assets/images/nutrition/plans-image.png");
const plansImageActive = require("../assets/images/plans-image-active.png");

const appleImage = require("../assets/images/nutrition/apple-image.png");
const appleImageActive = require("../assets/images/apple-image-active.png");

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

  tipsImage,
  tipsImageActive,
  performanceImage,
  performanceImageActive,
  foodsImage,
  foodsImageActive,
  plansImage,
  plansImageActive,
  appleImage,
  appleImageActive,

  profile,
  checkMark,
  headerDrawer,
  specialOffers,
  groupNutrition,
  groupExercises,
  groupServices,
  groupSpecialists,
  mail,
};
