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
  },
});

export const { changeEmail, changePassword } = authSlice.actions;
export const authReducer = authSlice.reducer;
