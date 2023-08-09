import { createSlice } from "@reduxjs/toolkit";
import { doFollow, unFollow, getAllFriends, countOfRequests } from "../thunk/friend";

let initialState = {
    loading: false,
    error: null,
    success: false,
    statusCode: '',
    msg: '',
    counts: 0,
    data: [],
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        requestAccepted: (state, action) => {
            if (!state.data) {
                state.data = []; // Initialize the array if it's undefined
            }
            state.data.push(action.payload);
        },
        refreshCount: state => {
            state.counts = state.counts - 1;
        }
    },
    extraReducers: builder => {
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
            // state.data = action.payload;
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
            state.data = state.data.filter(user => user.friend._id !== action.payload._id);
            state.statusCode = action.payload.statusCode;
            state.msg = action.payload.msg;
        })
        builder.addCase(unFollow.rejected, (state, action) => {
            state.error = action.error;
            state.success = false;
            state.loading = false;
            state.msg = action.error.message;
        })

        // get all followers 
        builder.addCase(getAllFriends.pending, state => {
            state.error = null;
            state.success = false;
            state.loading = true
        })
        builder.addCase(getAllFriends.fulfilled, (state, action) => {
            state.error = null;
            state.success = true;
            state.loading = false;
            state.data = action.payload.requests;
            state.statusCode = action.payload.statusCode;
            state.msg = action.payload.msg;
        })
        builder.addCase(getAllFriends.rejected, (state, action) => {
            state.error = action.error;
            state.success = false;
            state.loading = false;
            state.msg = action.error.message;
        })

        // count of coming friend request
        builder.addCase(countOfRequests.pending, state => {
            state.error = null;
            state.success = false;
            state.loading = true
        })
        builder.addCase(countOfRequests.fulfilled, (state, action) => {
            state.error = null;
            state.success = true;
            state.loading = false;
            state.counts = action.payload.counts;
            state.statusCode = action.payload.statusCode;
            state.msg = action.payload.msg;
        })
        builder.addCase(countOfRequests.rejected, (state, action) => {
            state.error = action.error;
            state.success = false;
            state.loading = false;
            state.msg = action.error.message;
        })
    }
})

export const { requestAccepted, refreshCount } = friendSlice.actions;
export default friendSlice.reducer;