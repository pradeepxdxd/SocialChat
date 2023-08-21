import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true,
        trim : true
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    viewed : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

export default mongoose.model('chat', chatSchema);
