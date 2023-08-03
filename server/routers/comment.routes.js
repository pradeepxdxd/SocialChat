import express from 'express';
import { doComment, removeComment, replyComment, getComment } from '../controllers/comment.controller.js';
import { auth } from '../middlewares/auth.js'

const router = express();

router.post('/doComment', doComment);
router.delete('/removeComment', removeComment);
router.post('/doReplyComment', replyComment);

router.get('/getComment', auth, getComment);

export default router;