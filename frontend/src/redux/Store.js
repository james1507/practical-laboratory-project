// store.js
import { configureStore } from "@reduxjs/toolkit";

import sessionReducer from "./SessionActions/SessionActions.js";

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
