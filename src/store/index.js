import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { soundtracksApi } from "./apis/soundtracksApi.js";
import { sessionsApi } from "./apis/sessionsApi.js";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [soundtracksApi.reducerPath]: soundtracksApi.reducer,
    [sessionsApi.reducerPath]: sessionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(soundtracksApi.middleware)
      .concat(sessionsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export {
  useRegisterUserMutation,
  useRemoveUserMutation,
  useGetAllUsersQuery,
  useLoginUserMutation,
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
