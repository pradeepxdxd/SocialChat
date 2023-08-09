import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from '../../services/utils/common';

export const getFollowRequest = createAsyncThunk('request/followRequest', async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/requested`, {
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

export const accpetRequest = createAsyncThunk('request/accept', async (user) => {
    try {
        await axios.get(`http://localhost:8000/api/friend/acceptRequest/${user.friendId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return user;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
})

export const rejectRequest = createAsyncThunk('friend/rejectRequest', async (user) => {
    try {
        await axios.delete(`http://localhost:8000/api/friend/rejectRequest/${user.friendId}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        return user;;
    } 
    catch (error) {
        console.log(error.message);
        throw error;    
    }
})

