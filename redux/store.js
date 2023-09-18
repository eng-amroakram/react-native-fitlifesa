import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import lang from "./slices/lang";

const store = configureStore({
  reducer: {
    auth: auth,
    lang: lang,
  },
});

export default store;
