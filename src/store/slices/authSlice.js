import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    changeEmail(state, action) {
      state.email = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    clearLoginForm(state) {
      state.email = "";
      state.password = "";
    },
  },
});

export const { changeEmail, changePassword, clearLoginForm } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
