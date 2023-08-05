import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import {getToken} from '../../utils/common'

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    try{
        const resp = await axios.get(`http://localhost:8000/api/user/get`, {
            headers : {
                'Authorization' : `Bearer ${getToken()}`
            }
        });

        return resp.data;
    }
    catch(err) {
        console.log(err.message);
    }
})

export const searchByName = createAsyncThunk('user/searchByName', async (name) => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/user/searchByName?name=${name}`, {
            headers : {
                Authorization : `Bearer ${getToken()}`
            }
        })

        return resp.data;
    } 
    catch (error) {
        console.log(error.message);
        throw error;
    }
})

