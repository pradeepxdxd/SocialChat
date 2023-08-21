import mongoose from 'mongoose';
import Friends from '../models/Friends.js'
import Chat from '../models/chat.js'

export const getMyAllFriends = async (req, res) => {
    try {
        const myId = req.user.userId;

        const friends = await Friends.aggregate([
            {
                $match: {
                    $and: [
                        { myId: new mongoose.Types.ObjectId(myId) },
                        { statusOfRequest: 'ACCEPTED' }
                    ]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'friendId',
                    foreignField: '_id',
                    as: 'friendDetails'
                }
            },
            {
                $unwind: "$friendDetails"
            },
            {
                $project: {
                    friendDetails: 1,
                }
            }
        ])

        if (friends && friends.length > 0) {
            res.status(200).send({ statusCode: 200, msg: 'Fetched your friends', friends });
        }
        else {
            res.status(404).send({ statusCode: 404, msg: 'No friends found' });
        }
    }
    catch (error) {
        console.log(error.msg);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, msg } = req.body;

        const chat = await Chat.create({ senderId: req.user.userId, receiverId, msg });

        if (chat) {
            res.status(201).send({ statusCode: 201, msg: 'Chat sent successfully', chat });
        }
        else {
            res.status(400).send({ statusCode: 400, msg: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const getChats = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const userId  = req.user.userId;

        // console.log(first)

        const chats = await Chat.find({
            $or: [
                { senderId: new mongoose.Types.ObjectId(userId), receiverId  : new mongoose.Types.ObjectId(receiverId) },
                { senderId: new mongoose.Types.ObjectId(receiverId), receiverId: new mongoose.Types.ObjectId(userId) }
            ]
        }).sort({ createdAt: 1 });

        if (chats && chats.length > 0) {
            const chatsWithFlags = chats.map(chat => {
                let flag;
                if (chat.senderId.equals(userId)) {
                    flag = 'SENDER';
                }
                else {
                    flag = 'RECEIVER';
                }
                return { ...chat.toObject(), flag };
            });

            res.status(200).send({ statusCode: 200, msg: 'Chats fetched successfully', chats: chatsWithFlags });
        }
        else {
            res.status(404).send({ statusCode: 404, msg: 'Chats not found' });
        }
    }
    catch (error) {
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const deleteChats = async (req, res) => {
    try {
        const deletedChat = await Chat.findByIdAndDelete(req.params.chatId);

        if (deletedChat) {
            res.status(204).send({ statusCode: 204, msg: 'Chat deleted Successfully' });
        }
        else {
            res.status(400).send({ statusCode: 400, msg: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

