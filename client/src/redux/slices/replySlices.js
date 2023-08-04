import { createSlice } from "@reduxjs/toolkit";
import {doReplyComment} from '../thunk/reply'

let initialState = {
    loading : false,
    success : false,
    error : null,
    data : []
}

const replySlices = createSlice({
    name : 'reply',
    initialState,
    extraReducers : builder => {
        builder.addCase(doReplyComment.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(doReplyComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload
        });
        builder.addCase(doReplyComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error
        });
    }
})

export default replySlices.reducer;

