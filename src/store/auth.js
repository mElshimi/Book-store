import { createSlice } from "@reduxjs/toolkit";

const authSLice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem("loggedIn") ? true : false,

    name: "mELshimi",
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("loggedIn", true);
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("loggedIn");
    },
  },
});

export const { logIn, name, logOut } = authSLice.actions;

export default authSLice.reducer;
