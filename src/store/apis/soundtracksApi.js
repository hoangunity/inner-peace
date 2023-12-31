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
        providesTags: (res, error, arg) => {
          const tags = [{ type: "Track/Add" }, { type: "Track/Remove" }];
          return tags;
        },
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
        invalidatesTags: (res, error, arg) => {
          console.log(res);
          return [{ type: "Track/Add" }];
        },
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
              file_name: data.trackName,
              image_name: data.imageName,
              title: data.trackTitle,
            },
          };
        },
      }),
      removeTrack: builder.mutation({
        invalidatesTags: (res, error, arg) => {
          return [{ type: "Track/Remove" }];
        },
        transformResponse: (response, meta, arg) => {
          console.log(response);
          return response.tracks;
        },
        query: ({ trackId, authToken }) => {
          return {
            method: "DELETE",
            url: `/soundtracks/${trackId}`,
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
  useAddTrackMutation,
  useGetAllTracksQuery,
  useRemoveTrackMutation,
} = soundtracksApi;
export { soundtracksApi };
