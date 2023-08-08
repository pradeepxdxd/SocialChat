import { createSlice } from "@reduxjs/toolkit";
import { doFollow, unFollow } from "../thunk/friend";

let initialState = {
    loading : false,
    error  : null,
    success : false,
    statusCode : '',
    data : null,
    msg : ''
}

const friendSlice = createSlice({
    name : 'friend',
    initialState,
    extraReducers : builder => {
        // send friend request
        builder.addCase(doFollow.pending, state => {
            state.error = null;
            state.success = false;
            state.loading = true
        })
        builder.addCase(doFollow.fulfilled, (state, action) => {
            state.error = null;
            state.success = true;
            state.loading = false;
            state.data = action.payload;
            state.statusCode = action.payload.statusCode;
            state.msg = action.payload.msg;
        })
        builder.addCase(doFollow.rejected, (state, action) => {
            state.error = action.error;
            state.success = false;
            state.loading = false;
            state.msg = action.error.message;
        })

        // unfollow 
        builder.addCase(unFollow.pending, state => {
            state.error = null;
            state.success = false;
            state.loading = true
        })
        builder.addCase(unFollow.fulfilled, (state, action) => {
            state.error = null;
            state.success = true;
            state.loading = false;
            state.data = action.payload;
            state.statusCode = action.payload.statusCode;
            state.msg = action.payload.msg;
        })
        builder.addCase(unFollow.rejected, (state, action) => {
            state.error = action.error;
            state.success = false;
            state.loading = false;
            state.msg = action.error.message;
        })
    }
})

export default friendSlice.reducer;