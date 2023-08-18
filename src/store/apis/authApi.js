/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://booking-system-api-hoangunity.sigma-school-full-stack.repl.co/api/v1",
  }),
  endpoints(builder) {
    return {
      getAllUsers: builder.query({
        transformResponse: (response, meta, arg) => response.data,
        providesTags: (result, error) => {
          const tags = result.map((user) => {
            return { type: "User", id: user.id };
          });
          console.log("get all users tags: ", tags);
          return tags;
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
        transformResponse: (response, meta, arg) => {
          console.log(response);
        },
        transformErrorResponse: (res, meta, arg) => {
          console.log(res);
          return res.data?.message;
        },
        query: (formData) => {
          return {
            method: "POST",
            url: "/users",
            body: {
              username: formData.username,
              phone_number: formData.phone_number,
              email: formData.email.toLowerCase(),
              password: formData.password,
              role: formData.role || "user",
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
        transformErrorResponse: (res, meta, arg) => {
          return res.data.message;
        },
        query: (formData) => {
          return {
            method: "POST",
            url: `/login`,
            body: {
              email: formData.email.toLowerCase(),
              password: formData.password,
            },
          };
        },
      }),
      firebaseLogin: builder.mutation({
        transformResponse: (response, meta, arg) => {
          const data = {
            user: response.user,
            token: response.token,
          };
          return data;
        },
        query: (firebaseUserData) => {
          const {
            email,
            displayName,
            photoURL,
            phoneNumber,
            emailVerified,
            uid,
          } = firebaseUserData;
          return {
            method: "POST",
            url: `/firebase/login`,
            body: {
              email: email,
              displayName: displayName,
              photoURL: photoURL,
              phoneNumber: phoneNumber,
              role: "user",
              emailVerified: emailVerified,
            },
            headers: {
              uid: uid,
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
  useFirebaseLoginMutation,
} = authApi;
export { authApi };
