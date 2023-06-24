import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    name : null,
    token : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser : (state, action) => {
            localStorage.setItem('user', JSON.stringify({
                name : action.payload.name,
                token : action.payload.token
            }))
            state.name = action.payload.name;
            state.token = action.payload.token
        },
        getUser : (state, action) => {
            const user = JSON.parse(localStorage.getItem('user'));
            state.name = user.name;
            state.token = user.token;
        },
        logout : (state, action) => {
            localStorage.removeItem('user');
            state.name = null;
            state.token = null;
        }
    }
})

export const {setUser, getUser, logout} = authSlice.actions;
export default authSlice.reducer;
