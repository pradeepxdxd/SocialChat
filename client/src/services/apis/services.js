import axios from 'axios'
import { getToken } from '../utils/common'

export const getPendingRequests = async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/pending`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return resp.data.requests;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getFriendRequests = async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/requested`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return resp.data.requests;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getFriends = async () => {
    try {
        const resp = await axios.get(`http://localhost:8000/api/friend/accepted`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        return resp.data.requests;
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

