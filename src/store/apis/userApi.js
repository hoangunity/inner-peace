import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://booking-system-api-hoangunity.sigma-school-full-stack.repl.co/api/v1",
  }),
  endpoints(builder) {
    return {
      getUserInfo: builder.query({
        providesTags: (result, error, id) => {
          const tags = [{ type: "User/Update" }];
          return tags;
        },
        transformResponse: (response, meta, arg) => {
          console.log(response.user);
          return response.user;
        },
        query: (authToken) => {
          return {
            method: "GET",
            url: "/profile",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
        },
      }),
      updateUser: builder.mutation({
        invalidatesTags: (result, error, formData) => {
          const tags = [{ type: "User/Update" }];
          // console.log(tags)
          return tags;
        },
        transformResponse: (response, meta, arg) => {
          return response.user;
        },
        query: (data) => {
          return {
            method: "PUT",
            url: "/profile",
            body: {
              username: data.username,
              phoneNumber: data.phone_number,
            },
            headers: {
              Authorization: `Bearer ${data.authToken}`,
            },
          };
        },
      }),
    };
  },
});

export const { useGetUserInfoQuery, useUpdateUserMutation } = userApi;
export { userApi };
