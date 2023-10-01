// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice";

// Kho lữu trữ dữ liệu
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
