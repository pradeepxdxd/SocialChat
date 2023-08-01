import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { getToken } from '../../utils/common';

export const doLikeAndUnLike = createAsyncThunk('like/doLikeAndUnLike', async ({posterId, postId}) => {
    try{
        const resp = await axios.get(`http://localhost:8000/api/like/postLikeAndUnLike?posterId=${posterId}&postId=${postId}`, 
            {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
        );
        return resp.data;
    }
    catch(err){
        console.log(err.message);
    }
})
