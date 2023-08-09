import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from '../../services/utils/common';

export const doFollow = createAsyncThunk('friend/doFollow', async (friendId) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/follow/${friendId}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

export const acceptRequest = createAsyncThunk('friend/acceptRequest', async (friendId) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/acceptRequest/${friendId}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

export const unFollow = createAsyncThunk('friend/unfollow', async (user) => {
    try {
        await axios.delete(`http://localhost:8000/api/friend/unfollow/${user._id}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        return user;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

export const getAllFriends = createAsyncThunk('friend/accepted', async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/accepted`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    
        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

export const countOfRequests = createAsyncThunk('friend/counts', async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/counts`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
    
        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

