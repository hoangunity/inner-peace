import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  changeEmail,
  changePassword,
  clearLoginForm,
} from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store };
export { changeEmail, changePassword, clearLoginForm };
