import * as Localization from "expo-localization";
import translations from "../lang/translates";

const translate = (key, langAsyncStorage = null) => {
  let locale = Localization.locale;
  let langFromDatabase = langAsyncStorage;

  if (locale) {
    lang = locale.split("-")[0];
  }

  if (langFromDatabase) {
    lang = langFromDatabase;
  }

  if (lang === "ar") {
    if (translations[key]) {
      return translations[key];
    } else {
      return key;
    }
  } else {
    return key;
  }
};

export default translate;
