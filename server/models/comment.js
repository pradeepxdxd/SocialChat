import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    posterId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    commenterId : {                             
        type : mongoose.Types.ObjectId,
        required : true
    },
    comment : {
        type : String,
        required : true,
    }
}, {timestamps : true});

export default mongoose.model('Comment', commentSchema);
