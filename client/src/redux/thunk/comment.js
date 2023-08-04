import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getToken } from '../../utils/common'

export const getComments = createAsyncThunk('/comment/getComments', async ({ page, postId }) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/comment/getComment?postId=${postId}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return resp.data;
    }
    catch (error) {
        console.log(error.message);
    }
})

