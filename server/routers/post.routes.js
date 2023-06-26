import express from 'express';
import { addPost, getPost, getMyPosts, editPost, deletePost } from '../controllers/post.controller.js';
import { auth } from '../middlewares/auth.js'
import { postsUpload } from '../utils/multer.js'

const router = express.Router();

router.post('/add', auth, postsUpload.single('post'), addPost);
router.get('/get/:id', auth, getPost);
router.get('/myPosts', auth, getMyPosts);
router.put('/edit/:id', auth, editPost);
router.delete('/delete/:id', auth, deletePost);

export default router;
