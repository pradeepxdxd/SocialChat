import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

export default mongoose.model('todo', todoSchema);