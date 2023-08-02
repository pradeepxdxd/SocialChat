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
    posterId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    // commenterId : {                              //  taking from jwt token
    //     type : mongoose.Types.ObjectId,
    //     required : true
    // },
    comment : {
        type : String,
        required : true
    }
}, {timestamps : true});

export default mongoose.model('Reply', ReplySchema);