import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    likerId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    posterId : {
        type : mongoose.Types.ObjectId,
        required : true
    }
}, {timestamps : true});

export default mongoose.model('Like', likeSchema);
