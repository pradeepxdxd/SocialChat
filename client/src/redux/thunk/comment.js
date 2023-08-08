import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getToken } from '../../services/utils/common'

export const getComments = createAsyncThunk('comment/getComments', async ({ page, postId }) => {
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

export const doComment = createAsyncThunk('comment/doComment', async ({ posterId, postId, data : comment }) => {
    try {
        console.log(comment, 'api')
        const resp = await axios.post(`http://localhost:8000/api/comment/doComment?posterId=${posterId}&postId=${postId}`, {comment}, {
            headers : {
                'Authorization' : `Bearer ${getToken()}`
            },
        });

        let user = resp.data.data;
        const userDetails = await axios.get(`http://localhost:8000/api/user/get`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        })
        user = {...user, userDetails : userDetails.data.user}
        resp.data = {...resp.data, data : user}
        return resp.data;
    }
    catch (error) {
        console.log(error.message);
    }
})
