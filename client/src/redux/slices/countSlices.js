import { createSlice } from "@reduxjs/toolkit";
import { getCountOfLikesAndFollowers, isFriend } from '../thunk/count'

let initialState = {
    likes: 0,
    followers: 0,
    posts: 0,
    loading : false,
    error : null,
    success : false,
    friend : false
}

const countSlice = createSlice({
    name: 'count',
    initialState,
    extraReducers: builder => {
        builder.addCase(getCountOfLikesAndFollowers.pending, state => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        builder.addCase(getCountOfLikesAndFollowers.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.followers = action.payload.followerCounts;
            state.likes = action.payload.result[0].totalLikes;
            state.posts = action.payload.result[0].totalPosts;
        })
        builder.addCase(getCountOfLikesAndFollowers.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error;
        })

        // is friend or not
        builder.addCase(isFriend.pending, state => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        builder.addCase(isFriend.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.friend = action.payload.flag;
        })
        builder.addCase(isFriend.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error;
        })
    }
});

export default countSlice.reducer;

