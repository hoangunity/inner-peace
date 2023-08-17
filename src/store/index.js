import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { soundtracksApi } from "./apis/soundtracksApi.js";
import { sessionsApi } from "./apis/sessionsApi.js";
import { userApi } from "./apis/userApi.js";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [soundtracksApi.reducerPath]: soundtracksApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(soundtracksApi.middleware)
      .concat(sessionsApi.middleware)
      .concat(userApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export {
  useRegisterUserMutation,
  useRemoveUserMutation,
  useGetAllUsersQuery,
  useLoginUserMutation,
  useFirebaseLoginMutation,
} from "./apis/authApi.js";
export {
  useAddTrackMutation,
  useGetAllTracksQuery,
  useRemoveTrackMutation,
} from "./apis/soundtracksApi.js";
export {
  useAddSessionMutation,
  useGetAllSessionsQuery,
  useRemoveSessionMutation,
  useGetSessionByIdQuery,
} from "./apis/sessionsApi.js";
export { useGetUserInfoQuery, useUpdateUserMutation } from "./apis/userApi.js";
