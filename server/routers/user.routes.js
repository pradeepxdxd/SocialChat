import express from 'express';
import {getUser, changePassword, forgetPassword, resetPassword, editProfile, mailDemo} from '../controllers/user.controller.js'
import {auth} from '../middlewares/auth.js'
import {profileImageUpload} from '../utils/multer.js';

const router = express.Router();

router.get('/get', auth, getUser);
router.patch('/changePassword', auth, changePassword);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', auth, resetPassword);
router.put('/editProfile', auth, profileImageUpload.single('profileImg'), editProfile);

export default router;