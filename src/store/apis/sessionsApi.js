/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const sessionsApi = createApi({
  reducerPath: "sessions",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://booking-system-api-hoangunity.sigma-school-full-stack.repl.co/api/v1",
  }),
  endpoints(builder) {
    return {
      getAllSessions: builder.query({
        providesTags: (res, error, arg) => {
          const tags = res.sessions.map((session) => {
            return { type: "Session", id: session.session_id };
          });
          tags.push({ type: "Session/Create" });
          console.log("Get all sessions: ", tags);
          return tags;
        },
        query: (authToken) => {
          return {
            method: "GET",
            url: "/sessions",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        },
      }),
      getSessionById: builder.query({
        transformResponse: (res, meta, arg) => {
          return res.session;
        },
        query: ({ sessionId, authToken }) => {
          return {
            method: "GET",
            url: `/sessions/${sessionId}`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        },
      }),
      addSession: builder.mutation({
        transformErrorResponse: (res, meta, arg) => {
          return res?.message;
        },
        invalidatesTags: (res, error, arg) => {
          const tags = [{ type: "Session", id: res.session.id }];
          console.log(res);
          tags.push({ type: "Session/Create" });
          console.log("session add: ", tags);
          return tags;
        },
        query: (formData) => {
          return {
            method: "POST",
            url: "/sessions",
            body: {
              track_id: formData.track_id,
              title: formData.title,
            },
            headers: {
              Authorization: `Bearer ${formData.authToken}`,
            },
          };
        },
      }),
      removeSession: builder.mutation({
        transformResponse: (response, meta, arg) => {
          console.log(response);
        },
        transformErrorResponse: (res, meta, arg) => {
          return res?.message;
        },
        invalidatesTags: (res, error, { id }) => {
          const tags = [{ type: "Session", id: id }];
          console.log("remove session", tags);
          return tags;
        },
        query: ({ id, authToken }) => {
          return {
            method: "DELETE",
            url: `/sessions/${id}`,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        },
      }),
    };
  },
});

export const {
  useAddSessionMutation,
  useGetAllSessionsQuery,
  useGetSessionByIdQuery,
  useRemoveSessionMutation,
} = sessionsApi;
export { sessionsApi };
