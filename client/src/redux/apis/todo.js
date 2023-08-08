import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../../services/utils/common'

const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/todo"
    }),
    tagTypes : ['Todos'],
    endpoints: builder => {
        return {
            addTodo: builder.mutation({
                invalidatesTags : ['Todos'],
                query: user => {
                    return {
                        url: '/add',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                        method: 'POST',
                        body: user
                    }
                }
            }),
            getTodos: builder.query({
                providesTags : ['Todos'],
                query: () => {
                    return {
                        url: '/get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                        method: 'GET'
                    }
                }
            }),
            getUserTodos: builder.query({
                providesTags : ['Todos'],
                query: () => {
                    return {
                        url: '/getUserTodos',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                        method: 'GET'
                    }
                }
            }),
            removeTodo: builder.mutation({
                invalidatesTags : ['Todos'],
                query: id => {
                    return {
                        url: `/delete/${id}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                        method: 'DELETE'
                    }
                }
            }),
            editTodo: builder.mutation({
                invalidatesTags : ['Todos'],
                query: todo => {
                    return {
                        url: `/edit/${todo._id}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getToken()}`
                        },
                        body : todo,
                        method: 'PATCH'
                    }
                }
            })
        }
    }
})

export const { useAddTodoMutation, useGetTodosQuery, useGetUserTodosQuery, useEditTodoMutation, useRemoveTodoMutation } = todoApi;
export { todoApi };
