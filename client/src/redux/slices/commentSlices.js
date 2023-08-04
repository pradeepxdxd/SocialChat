import { createSlice } from "@reduxjs/toolkit";
import { getComments } from '../thunk/comment'

let initialState = {
    success: false,
    loading: false,
    error: null,
    data: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    extraReducers: builder => {
        builder.addCase(getComments.pending, (state, action) => {
            state.success = false;
            state.loading = true;
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })
    }
})

export default commentSlice.reducer;