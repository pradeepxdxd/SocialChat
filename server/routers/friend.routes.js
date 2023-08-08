import express from 'express';
import {
    acceptFriendRequest,
    rejectRequest,
    sendFriendRequest,
    unFollowUser,
    getPendingRequest,
    getFriendRequests,
    getFriends
} from '../controllers/friend.controller.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.get('/follow/:friendId', auth, sendFriendRequest);
router.get('/acceptRequest/:friendId', auth, acceptFriendRequest);
router.delete('/unfollow/:friendId', auth, unFollowUser);
router.delete('/rejectRequest/:friendId', auth, rejectRequest);
router.get('/pending', auth, getPendingRequest);
router.get('/requested', auth, getFriendRequests);
router.get('/accepted', auth, getFriends);

export default router;