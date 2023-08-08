import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { getToken } from '../../services/utils/common'

export const getReplyComment = createAsyncThunk('reply/getReplyComment', async ({page, commentId}) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/comment/getReply?commentId=${commentId}`, {headers : {Authorization : `Bearer ${getToken()}`}});

        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;
    }
});

export const doReplyComment = createAsyncThunk('reply/doReplyComment', async ({ posterId, postId, commentId, data : comment }) => {
    try {
        const resp = await axios.post(`http://localhost:8000/api/comment/doReplyComment?posterId=${posterId}&postId=${postId}&commentId=${commentId}`,{comment}, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
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
    } catch (error) {
        console.log(error.message);
        throw error;
    }
})

