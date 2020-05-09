import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authed: token ? true : false,
  },
  reducers: {
    login: (state) => ({
      ...state,
      authed: true,
    }),
    logout: (state) => ({
      ...state,
      authed: false,
    }),
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
