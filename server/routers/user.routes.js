import express from 'express';
import {
    getUser,
    changePassword,
    forgetPassword,
    resetPassword, 
    editProfile, 
    searchByName, 
    sendFriendRequest,
    acceptFriendRequest,
    unFollowUser,
    rejectRequest
} from '../controllers/user.controller.js'

import {auth} from '../middlewares/auth.js'
import {profileImageUpload} from '../utils/multer.js';

const router = express.Router();

router.get('/get', auth, getUser);
router.put('/editProfile', auth, profileImageUpload.single('profileImg'), editProfile);
router.get('/searchByName', auth, searchByName);

router.patch('/changePassword', auth, changePassword);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', auth, resetPassword);

router.get('/follow/:friendId', auth, sendFriendRequest);
router.get('/acceptRequest/:friendId', auth, acceptFriendRequest);
router.delete('/unfollow/:friendId', auth, unFollowUser);
router.delete('/rejectRequest/:friendId', auth, rejectRequest);

export default router;