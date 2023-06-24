import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import 'colors'

export default (function(){
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('database connected successfully...'.cyan))
        .catch(err => err);
}())
    
