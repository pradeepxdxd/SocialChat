import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../services/utils/common'
import axios from 'axios';

export const getAllFriends = createAsyncThunk('chat/getFrinds', async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/chat/my-friends`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return resp.data;
    }
    catch (error) {
        console.log(error)
        throw error;
    }
});

export const sendMessage = createAsyncThunk('chat/sendChat', async (data) => {
    try {
        const resp = await axios.post(`http://localhost:8000/api/chat/send-message`, data, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        })

        return resp.data;
    } 
    catch (error) {
        console.log(error.sendMessage);
        throw error;        
    }
});

export const getChats = createAsyncThunk('chat/getChats', async (receiverId) => {
    try{
        const resp = await axios.get(`http://localhost:8000/api/chat/getChats/${receiverId}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        });

        return resp.data;
    }
    catch(err){
        console.log(err)
        throw err;
    }
});

