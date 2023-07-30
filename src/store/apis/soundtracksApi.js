/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const soundtracksApi = createApi({
  reducerPath: "soundtracks",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://booking-system-api-hoangunity.sigma-school-full-stack.repl.co/api/v1",
  }),
  endpoints(builder) {
    return {
      getAllTracks: builder.query({
        transformResponse: (res, meta, arg) => {
          return res.tracks;
        },
        transformErrorResponse: (res, meta, arg) => {
          return res?.message;
        },
        query: () => {
          return {
            method: "GET",
            url: "/soundtracks",
          };
        },
      }),
      addTrack: builder.mutation({
        transformResponse: (response, meta, arg) => {
          return response.track;
        },
        query: (data) => {
          return {
            method: "POST",
            url: "/soundtracks",
            body: {
              file_url: data.fileUrl,
              image_url: data.imageUrl,
              title: data.trackTitle,
            },
          };
        },
      }),
    };
  },
});

export const { useAddTrackMutation, useGetAllTracksQuery } = soundtracksApi;
export { soundtracksApi };
