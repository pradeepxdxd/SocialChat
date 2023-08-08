import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from '../../services/utils/common';

export const doFollow = createAsyncThunk('user/doFollow', async (friendId) => {
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

export const acceptRequest = createAsyncThunk('user/acceptRequest', async (friendId) => {
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

export const unfollow = createAsyncThunk('user/unfollow', async (friendId) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/unfollow/${friendId}`, {
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

export const rejectRequest = createAsyncThunk('user/rejectRequest', async (friendId) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/rejectRequest/${friendId}`, {
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

