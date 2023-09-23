const navigator = {
  index: "index",
  home: "home",
  login: "auth/login",
  register: "auth/register",
  verify: "auth/verify",
  intro: "auth/intro",
  bodyIOS: "questionnaire/BodyIOS",
  questions: "questionnaire/questions",
  results: "questionnaire/results",
  profile: "settings/profile",
  about: "settings/about",
  foods: "nutrition/foods",
  privacy: "settings/privacy",
};

const getNavigator = (route) => {
  return navigator[route];
};

export default getNavigator;
