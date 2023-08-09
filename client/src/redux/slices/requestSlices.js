import { createSlice } from "@reduxjs/toolkit";
import { getFollowRequest, accpetRequest, rejectRequest } from '../thunk/followRequest'

let initialState = {
    loading: false,
    error: null,
    success: false,
    data: []
}

const requestSlices = createSlice({
    name: 'request',
    initialState,
    extraReducers: builder => {
        // get all follow request
        builder.addCase(getFollowRequest.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false
        })
        builder.addCase(getFollowRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.data = action.payload.requests;
        })
        builder.addCase(getFollowRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false
        })

        // accept request
        builder.addCase(accpetRequest.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false
        })
        builder.addCase(accpetRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.data = state.data.filter(user => user.friend._id !== action.payload.friendId);
        })
        builder.addCase(accpetRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false
        })

        // reject request
        builder.addCase(rejectRequest.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false
        })
        builder.addCase(rejectRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.data = state.data.filter(user => user.friendId !== action.payload.friendId);
        })
        builder.addCase(rejectRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false
        })
    }
})

export default requestSlices.reducer;
