import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';

const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:8000/api/auth'
    }),
    endpoints : builder => {
        return {
            signUp : builder.mutation({
                query : user => {
                    return {
                        url : '/regis',
                        method : 'POST',
                        body : user
                    }
                }
            }),
            login : builder.mutation({
                query : user => {
                    return {
                        url : '/login',
                        method : 'POST',
                        body : user
                    }
                }
            })
        }
    }
})

export const { useSignUpMutation, useLoginMutation } = authApi;
export {authApi};