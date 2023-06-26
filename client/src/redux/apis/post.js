import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getToken} from '../../utils/common'

const postApi = createApi({
    reducerPath : 'postApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://localhost:8000/api/post'
    }),
    tagTypes : ['Posts'],
    endpoints : builder => {
        return {
            addPost : builder.mutation({
                query : post => {
                    return {
                        url : '/add',
                        method : 'POST',
                        headers : {
                            'Authorization' : `Bearer ${getToken()}`
                        },
                        body : post
                    }
                }
            }),
            myPosts : builder.query({
                providesTags : ['Posts'],
                query : q => {
                    return {
                        url : `myPosts?page=${q.page}`,
                        method : 'GET',
                        headers : {
                            'Authorization' : `Bearer ${getToken()}`
                        }
                    }
                }
            })
        }
    }
})

export const {useAddPostMutation, useMyPostsQuery} = postApi;
export {postApi};
