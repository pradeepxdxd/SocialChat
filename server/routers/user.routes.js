import express from 'express';
import {getUser, changePassword, forgetPassword, resetPassword, editProfile} from '../controllers/user.controller.js'
import {auth} from '../middlewares/auth.js'
import upload from '../utils/multer.js';

const router = express.Router();

router.get('/get', auth, getUser);
router.patch('/changePassword', auth, changePassword);
router.post('/forgetPassword', forgetPassword);
router.post('/resetPassword', auth, resetPassword);
router.put('/editProfile', auth, upload.single('profileImg'), editProfile);

export default router;