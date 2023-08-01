import { createSlice } from "@reduxjs/toolkit";
import {doLikeAndUnLike} from '../thunk/like'

let initialState = {
    isSuccess : false,
    error : null
}

const likeSlice = createSlice({
    name : 'like',
    initialState,
    extraReducers : builder => {
        builder.addCase(doLikeAndUnLike.pending, (state, action) => {
            state.isSuccess = false
        })
        builder.addCase(doLikeAndUnLike.fulfilled, (state, action) => {
            state.isSuccess = true;
        })
        builder.addCase(doLikeAndUnLike.rejected, (state, action) => {
            state.isSuccess = false;
            state.error = action.error
        })
    }
})

export default likeSlice.reducer;
