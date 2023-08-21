import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import 'colors';
import cors from 'cors'
import './utils/config.js';
import router from './routers/index.routes.js'

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use('/api', router);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`.bold.underline));
