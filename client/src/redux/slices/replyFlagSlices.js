import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    flag: false,
    commentId: '',
    postId: '',
    posterId: ''
}

const replyFlagSlice = createSlice({
    name: 'replyFlag',
    initialState,
    reducers: {
        checkFlag: (state, action) => {
            state.flag = action.payload;
        },
        getIds: (state, action) => {
            if (state.flag) {
                state.commentId = action.payload.commentId;
                state.postId = action.payload.postId;
                state.posterId = action.payload.posterId;
            }
            else {
                state.postId = action.payload.postId;
                state.posterId = action.payload.posterId;
                state.commentId = ''
            }
        }
    }
})

export const { checkFlag , getIds} = replyFlagSlice.actions;
export default replyFlagSlice.reducer;
