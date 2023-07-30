import {createSlice} from '@reduxjs/toolkit'
import {getMyPosts} from '../thunk/post'

const initialState = {
    isLoading : false,
    isSuccess : false,
    data : [],
    isError : false,
    error : null
}

const postSlice = createSlice({
    name : 'post',
    initialState,
    extraReducers : builder => {
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
    }
});

export default postSlice.reducer;
