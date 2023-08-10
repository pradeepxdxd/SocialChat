import express from 'express';
import { addPost, getMyPosts, editPost, deletePost, socialMediaDemo, getUserPosts, getCountsOfLikesAndFollowers } from '../controllers/post.controller.js';
import { auth } from '../middlewares/auth.js'
import { postsUpload } from '../utils/multer.js'

const router = express.Router();

router.post('/add', auth, postsUpload.single('post'), addPost);
router.get('/getUserPost', auth, getUserPosts);
router.get('/myPosts', auth, getMyPosts);
router.get('/social-media-demo', socialMediaDemo);
router.put('/edit/:id', auth, editPost);
router.delete('/delete/:id', auth, deletePost);
router.get('/counts/all/:userId', auth, getCountsOfLikesAndFollowers);

export default router;
