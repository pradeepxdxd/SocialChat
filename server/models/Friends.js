import mongoose from "mongoose";

const FriendsSchema = new mongoose.Schema({
    friendId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    myId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    statusOfRequest: {                     
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REQUEST'],
        default: 'PENDING',
    }

}, { timestamps: true });

export default mongoose.model('Friend', FriendsSchema);;