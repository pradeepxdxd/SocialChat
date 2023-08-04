import express from 'express';
import { doComment, removeComment, replyComment, getComment, getReply } from '../controllers/comment.controller.js';
import { auth } from '../middlewares/auth.js'

const router = express();

router.post('/doComment', auth, doComment);
router.delete('/removeComment', auth, removeComment);
router.post('/doReplyComment', auth, replyComment);

router.get('/getComment', auth, getComment);
router.get('/getReply', auth, getReply);

export default router;