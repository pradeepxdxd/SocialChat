import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    caption : {
        type : String,
        required : true
    },
    post : {
        type : String,
        required : true
    }
}, {timestamps : true});

const Post = mongoose.model('post', postSchema);
export default Post;
