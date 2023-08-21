import express from 'express'
import authRoute from '../routers/auth.routes.js';
import postRoute from '../routers/post.routes.js';
import userRoute from '../routers/user.routes.js';
import likeRoute from '../routers/like.routes.js';
import commentRoute from '../routers/comment.routes.js';
import friendRoute from '../routers/friend.routes.js';
import chatRoute from '../routers/chat.routes.js'

const app = express();

app.use('/auth', authRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);
app.use('/like', likeRoute);
app.use('/comment', commentRoute);
app.use('/friend', friendRoute);
app.use('/chat', chatRoute);

export default app;