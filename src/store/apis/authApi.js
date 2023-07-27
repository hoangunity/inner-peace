/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://booking-system-api-hoangunity.sigma-school-full-stack.repl.co/api/v1",
  }),
  endpoints(builder) {
    return {
      getAllUsers: builder.query({
        providesTags: (result, error) => {
          if (!result) {
            return [];
          } else {
            const tags = result.data.map((user) => {
              return { type: "User", id: user.id };
            });
            return tags;
          }
        },
        query: () => {
          return {
            method: "GET",
            url: "/users",
          };
        },
      }),
      registerUser: builder.mutation({
        invalidatesTags: (result, error, formData) => {
          return [{ type: "User", id: result.data.id }];
        },
        query: (formData) => {
          return {
            method: "POST",
            url: "/users",
            body: {
              username: formData.username || faker.internet.userName(),
              phone_number:
                formData.phone_number || faker.phone.number("+84 91 ### ## ##"),
              email: formData.email,
              password: formData.password,
            },
          };
        },
      }),
      removeUser: builder.mutation({
        invalidatesTags: (result, error, userId) => {
          const tags = [{ type: "User", id: userId }];
          return tags;
        },
        query: (userId) => {
          return {
            method: "DELETE",
            url: `/users/${userId}`,
          };
        },
      }),
      loginUser: builder.mutation({
        query: (formData) => {
          return {
            method: "POST",
            url: `/login`,
            body: {
              email: formData.email,
              password: formData.password,
            },
          };
        },
      }),
    };
  },
});

export const {
  useRegisterUserMutation,
  useRemoveUserMutation,
  useGetAllUsersQuery,
  useLoginUserMutation,
} = authApi;
export { authApi };
