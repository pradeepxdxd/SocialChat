import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'colors';
import cors from 'cors'
import './utils/config.js';

import authRoute from './routers/auth.routes.js';
import todoRoute from './routers/todo.routes.js';
import userRoute from './routers/user.routes.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/todo', todoRoute);
app.use('/api/user', userRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`.bold.underline));
