// redux/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false, // true
  isSignUp: false,
  roles: [],
  fullName: String,
  age: String,
  collage: String,
  position: String,
  major: String,
  yearExp: String,
  aboutMe: String,
  imageUrl: String,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setSignUp: (state, action) => {
      state.isSignUp = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setCollage: (state, action) => {
      state.collage = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setMajor: (state, action) => {
      state.major = action.payload;
    },
    setYearExp: (state, action) => {
      state.yearExp = action.payload;
    },
    setAboutMe: (state, action) => {
      state.aboutMe = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const {
  setLoggedIn,
  setSignUp,
  setId,
  setUsername,
  setEmail,
  setRoles,
  setFullName,
  setAge,
  setCollage,
  setPosition,
  setMajor,
  setYearExp,
  setAboutMe,
  setImageUrl,
} = authSlice.actions;

export default authSlice.reducer;
