import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/common";

const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/user",
    }),
    tagTypes : ['User'],
    endpoints: (builder) => {
        return {
            getUser: builder.query({
                providesTags : ['User'],
                query: () => {
                    return {
                        url: "/get",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken()}`,
                        },
                    };
                },
            }),
            changePassword: builder.mutation({
                query: (data) => {
                    return {
                        url: "/changePassword",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${getToken()}`,
                        },
                        method: "PATCH",
                        body: data,
                    };
                },
            }),
            forgetPassword: builder.mutation({
                query: (data) => {
                    return {
                        url: "/forgetPassword",
                        method: "POST",
                        body: data,
                    };
                },
            }),
            resetPassword: builder.mutation({
                query: user => {
                    return {
                        url: '/resetPassword',
                        method: 'POST',
                        body: user.data,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${user.token}`,
                        }
                    }
                }
            }),
            editProfile: builder.mutation({
                invalidatesTags : ['User'],
                query: data => {
                    return {
                        url: '/editProfile',
                        method: 'PUT',
                        headers: {
                            "Authorization": `Bearer ${getToken()}`,
                        },
                        body: data
                    }
                }
            })
        };
    },
});

export const {
    useGetUserQuery,
    useChangePasswordMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useEditProfileMutation
} = userApi;
export { userApi };
