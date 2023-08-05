import { createSlice } from "@reduxjs/toolkit";
import { getComments, doComment } from '../thunk/comment'

let initialState = {
    success: false,
    loading: false,
    error: null,
    data: []
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        getAllComments: (state) => {
            return state.data;
        }
    },
    extraReducers: builder => {
        // getComment
        builder.addCase(getComments.pending, (state, action) => {
            state.success = false;
            state.loading = true;
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        })

        // doComment
        builder.addCase(doComment.pending, (state) => {
            state.success = false;
            state.loading = true;
            state.error = null; // Reset error when pending
        })
        builder.addCase(doComment.fulfilled, (state, action) => {
            state.success = true;
            state.loading = false;
            if (!state.data) {
                state.data = []; // Initialize the array if it's undefined
            }
            state.data.push(action.payload.data); // Assuming your payload has a 'data' property
            state.error = null; // Reset error on success
        })
        builder.addCase(doComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default commentSlice.reducer;