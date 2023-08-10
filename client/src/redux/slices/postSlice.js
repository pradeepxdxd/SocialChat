import { createSlice } from '@reduxjs/toolkit'
import { getMyPosts, getUserPosts } from '../thunk/post'

const initialState = {
    isLoading: false,
    isSuccess: false,
    data: [],
    isError: false,
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    extraReducers: builder => {
        builder.addCase(getMyPosts.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(getMyPosts.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.data = action.payload;
            state.isLoading = false;
        })
        builder.addCase(getMyPosts.rejected, (state, action) => {
            state.error = action.error;
            state.isError = true;
            state.isLoading = false;
        })

        // get user post by userId
        builder.addCase(getUserPosts.pending, state => {
            state.isLoading = true;
            state.error = null;
            state.isError = false;
            state.isSuccess = false;
        })
        builder.addCase(getUserPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.isError = false;
            state.isSuccess = true;
            state.data = action.payload.data;
        })
        builder.addCase(getUserPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
            state.isError = true;
            state.isSuccess = false;
        })
    }
});

export const { getConcatMyPost } = postSlice.actions
export default postSlice.reducer;
