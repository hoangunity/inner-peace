import { configureStore } from "@reduxjs/toolkit";
import { authReducer, changeEmail, changePassword } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store };
export { changeEmail, changePassword };
