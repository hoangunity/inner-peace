import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
setupListeners;

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export {
  useRegisterUserMutation,
  useRemoveUserMutation,
  useGetAllUsersQuery,
} from "./apis/authApi";
