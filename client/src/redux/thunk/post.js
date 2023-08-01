import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../utils/common";

// posts api
export const getMyPosts = createAsyncThunk('post/getMyPosts', async (page) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/post/myPosts?page=${page+1}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return resp.data;
    } 
    catch (err) {
        console.log(err.message);
        throw err; // Rethrow the error to let the caller handle it
    }
});
