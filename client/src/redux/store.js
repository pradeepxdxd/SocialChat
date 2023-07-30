import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authApi} from './apis/auth'
import authReducer from './slices/authSlices'
import {todoApi} from './apis/todo'
import {userApi} from './apis/user'
// import {postApi} from './apis/post'
import postReducer from './slices/postSlice';
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath] : todoApi.reducer,
    [userApi.reducerPath] : userApi.reducer,
    // [postApi.reducerPath] : postApi.reducer,
    auth : authReducer,
    post : postReducer,
    user : userReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(todoApi.middleware)
      .concat(userApi.middleware)
      // .concat(postApi.middleware)
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
