import axios from "axios";
import { getToken } from "../../services/utils/common";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCountOfLikesAndFollowers = createAsyncThunk('count/getCount', async (userId) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/post/counts/all/${userId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return resp.data;
    }
    catch (error) {
        console.log(error)
        throw error;
    }
}) 

export const isFriend = createAsyncThunk('count/isFriend', async friendId => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/check-friend/${friendId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        })
        return resp.data;
    } 
    catch (error) {
        console.log(error)
        throw error;
    }
})
