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
      registerUser: builder.mutation({
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
        query: (userId) => {
          return {
            method: "DELETE",
            url: `/users/${userId}`,
          };
        },
      }),
    };
  },
});

export const { useRegisterUserMutation, useRemoveUserMutation } = authApi;
export { authApi };
