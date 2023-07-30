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
        // transformResponse: (res, meta, arg) => {
        //   return res.sessions;
        // },
        // transformErrorResponse: (res, meta, arg) => {
        //   return res?.message;
        // },
        providesTags: (res, error, arg) => {
          const tags = res.sessions.map((session) => {
            return { type: "Session", id: session.session_id };
          });
          tags.push({
            type: "User",
            id: res?.sessions?.[0]?.session?.user_id,
          });

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
      addSession: builder.mutation({
        transformResponse: (response, meta, arg) => {
          console.log(response);
        },
        transformErrorResponse: (res, meta, arg) => {
          return res?.message;
        },
        invalidatesTags: (res, error, arg) => {
          return [{ type: "User", id: res.session.user_id }];
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
    };
  },
});

export const { useAddSessionMutation, useGetAllSessionsQuery } = sessionsApi;
export { sessionsApi };
