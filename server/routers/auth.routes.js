import express from 'express';
import {regis, login} from '../controllers/user.controller.js';
import {profileImageUpload} from '../utils/multer.js';

const router = express.Router();

router.post('/regis', profileImageUpload.single('profileImg'), regis);
router.post('/login', login);

export default router;
