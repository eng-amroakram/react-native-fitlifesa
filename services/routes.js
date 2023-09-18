import axios from "axios";

export const baseUrl = "https://fitlifesa.co/api/v2/";
const videoUrl = "https://fitlifesa.co/storage/images/settings/Intro.mp4";

export const routes = {
  auth: {
    user: "auth/user",
    register: "auth/register",
    login: "auth/login",
    verify: "auth/verify",
    logout: "auth/logout",
    changePassword: "auth/change-password",
    resendSmsOtp: "auth/resend-sms-otp",
    video: videoUrl,
  },

  questionnaire: {
    bodyIOS: "questionnaire/BodyIOS",
    questions: "questionnaire/questions",
    createMacronutrientsPlan: "questionnaire/create-macronutrients-plan",
    moreInfoBodyFatpercentage: "questionnaire/more-info-body-fat-percentage",
  },

  profile: {
    user: "profile/user",
    update: "profile/update",
  },
};

const createUrl = (path) => baseUrl + path;

const api = {
  get: async (path, config = {}) => {
    let lang = config.lang;
    let url = createUrl(path) + "?lang=" + lang || "en";

    config.headers = {
      "Content-Type": "application/json",
      "Accept-Language": lang || "en",
      Authorization: `Bearer ${config.token}`,
    };
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  post: async (path, data, config = {}) => {
    let lang = config.lang;
    let url = createUrl(path) + "?lang=" + lang || "en";

    config.headers = {
      "Content-Type": "application/json",
      "Accept-Language": lang || "en",
      Authorization: `Bearer ${config.token}`,
    };

    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  put: async (path, data, config = {}) => {
    let lang = config.lang;
    let url = createUrl(path) + "?lang=" + lang || "en";
    //
    config.headers = {
      "Content-Type": "application/json",
      "Accept-Language": lang || "en",
      Authorization: `Bearer ${config.token}`,
    };
    try {
      const response = await axios.put(url, data, config);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  delete: async (path, config = {}) => {
    let lang = config.lang;
    let url = createUrl(path) + "?lang=" + lang || "en";

    config.headers = {
      "Content-Type": "application/json",
      "Accept-Language": lang || "en",
      Authorization: `Bearer ${config.token}`,
    };
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};

export default api;
