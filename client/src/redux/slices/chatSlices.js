import { createSlice } from '@reduxjs/toolkit'
import { getAllFriends, sendMessage, getChats } from '../thunk/chat'

let initialState = {
    loading: false,
    success: false,
    error: null,
    chats: [],
    friends: []
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    extraReducers: builder => {
        // get friends
        builder.addCase(getAllFriends.pending, state => {
            state.error = null;
            state.loading = true;
            state.success = false;
        });
        builder.addCase(getAllFriends.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.friends = action.payload.friends;
        });
        builder.addCase(getAllFriends.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error;
        });

        // send message
        builder.addCase(sendMessage.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.chats.push({...action.payload.chat, flag : 'SENDER'});
        });
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.error;
        });

        // get chats
        builder.addCase(getChats.pending, state => {
            state.loading = true;
            state.error = null;
            state.success = false;
        });
        builder.addCase(getChats.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.chats = action.payload.chats;
        });
        builder.addCase(getChats.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.chats.length = 0;
            state.error = action.error
        });
    }
});

export default chatSlice.reducer;
