import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    postId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    commentId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    posterId : {                                    // commenter 
        type : mongoose.Types.ObjectId,
        required : true
    },
    commenterId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    comment : {
        type : String,
        required : true
    }
}, {timestamps : true});

export default mongoose.model('Reply', ReplySchema);