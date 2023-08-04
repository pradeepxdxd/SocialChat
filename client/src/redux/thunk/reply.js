import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { getToken } from '../../utils/common'

export const doReplyComment = createAsyncThunk('reply/doReplyComment', async ({page, commentId}) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/comment/getReply?commentId=${commentId}`, {headers : {Authorization : `Bearer ${getToken()}`}});

        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
    }
})
