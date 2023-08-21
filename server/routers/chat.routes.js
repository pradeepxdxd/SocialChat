import express from 'express';
import { auth } from '../middlewares/auth.js'
import {
    getMyAllFriends, sendMessage, getChats, deleteChats
} from '../controllers/chat.controller.js'

const router = express();

router.get('/my-friends', auth, getMyAllFriends);
router.post('/send-message', auth, sendMessage);
router.get('/getChats/:receiverId', auth, getChats);
router.delete('/delete-chat/:chatId', auth, deleteChats);

export default router;