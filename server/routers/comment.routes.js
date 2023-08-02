import express from 'express';
import { doComment, removeComment, replyComment } from '../controllers/comment.controller.js';

const router = express();

router.post('/doComment', doComment);
router.delete('/removeComment', removeComment);
router.post('/replyComment', replyComment);

export default router;