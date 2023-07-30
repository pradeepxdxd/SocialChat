import { createSlice } from "@reduxjs/toolkit";
import {getUserInfo} from '../thunk/user'

const initialState = {
    isSuccess : false,
    isError : false,
    loading : false,
    error : null,
    data : null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    extraReducers : builder => {
        builder.addCase(getUserInfo.pending, (state) => {
            state.loading = true
            state.isSuccess = false;
            state.isError = false;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.isSuccess = true;
            state.isError = false;
        })
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false;
            state.isError = true;
            state.error = action.error
        })
    }
})

export default userSlice.reducer;
