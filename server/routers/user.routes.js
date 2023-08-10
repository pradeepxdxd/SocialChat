import express from 'express';
import {
    getUser,
    changePassword,
    forgetPassword,
    resetPassword, 
    editProfile, 
    searchByName,
    getUserById
} from '../controllers/user.controller.js'

import {auth} from '../middlewares/auth.js'
import {profileImageUpload} from '../utils/multer.js';

const router = express.Router();

router.get('/get', auth, getUser);
router.put('/editProfile', auth, profileImageUpload.single('profileImg'), editProfile);
router.get('/searchByName', auth, searchByName);
router.get('/get/:userId', auth, getUserById);

router.patch('/changePassword', auth, changePassword);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', auth, resetPassword);

export default router;