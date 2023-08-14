import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'colors';
import cors from 'cors'
import './utils/config.js';

import authRoute from './routers/auth.routes.js';
import postRoute from './routers/post.routes.js';
import userRoute from './routers/user.routes.js';
import likeRoute from './routers/like.routes.js';
import commentRoute from './routers/comment.routes.js';
import friendRoute from './routers/friend.routes.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);
app.use('/api/like', likeRoute);
app.use('/api/comment', commentRoute);
app.use('/api/friend', friendRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`.bold.underline));
