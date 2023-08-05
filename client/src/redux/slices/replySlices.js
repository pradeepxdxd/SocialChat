import { createSlice } from "@reduxjs/toolkit";
import { getReplyComment, doReplyComment } from '../thunk/reply'

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
        // get Reply Comment
        builder.addCase(getReplyComment.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        });
        builder.addCase(getReplyComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload.data
            state.error = null;
        });
        builder.addCase(getReplyComment.rejected, (state, action) => {
            state.data = [];
            state.loading = false;
            state.success = false;
            state.error = action.error
        });

        // do Reply Comment
        builder.addCase(doReplyComment.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        })
        builder.addCase(doReplyComment.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.data.push(action.payload.data)
        })
        builder.addCase(doReplyComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.success = false;
        })
    }
})

export default replySlices.reducer;

