import express from 'express';
import { auth } from '../middlewares/auth.js';
import {postLikeAndUnLike, countLikeOfPost, getUsersWhoLike} from '../controllers/like.controller.js'

const router = express.Router();

router.get('/postLikeAndUnLike', auth, postLikeAndUnLike);
router.get('/countLike/:postId', auth, countLikeOfPost);
router.get('/getUsersWhoLike/:postId', auth, getUsersWhoLike);

export default router;