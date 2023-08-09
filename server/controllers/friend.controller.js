import mongoose from 'mongoose';
import Friend from '../models/Friends.js'

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.userId;
        const friendId = req.params.friendId;

        const pendingRequest = await Friend.findOne({ friendId, myId, statusOfRequest: 'PENDING' });
        if (pendingRequest) {
            await Friend.deleteOne({ friendId, myId, statusOfRequest: 'PENDING' });
            await Friend.deleteOne({ friendId: myId, myId: friendId, statusOfRequest: 'REQUEST' });
            return res.status(203).send({ statusCode: 203, msg: 'Request reverted successfully' });
        }

        const friendRequest = await Friend.create({ friendId, myId, statusOfRequest: 'PENDING' });
        if (friendRequest) {
            const requestSent = await Friend.create({ friendId: myId, myId: friendId, statusOfRequest: 'REQUEST' });
            if (requestSent) {
                res.status(201).send({ statusCode: 201, msg: 'Request sent successfully' });
            }
            else {
                res.status(404).send({ statusCode: 404, msg: 'User is not found' });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const myId = req.user.userId;

        const alreadAccepted = await Friend.findOne({ friendId, myId, statusOfRequest: 'ACCEPTED' }).lean();

        if (alreadAccepted) {
            return res.status(200).send({ statusCode: 200, msg: 'You both already follow each other' });
        }

        const requestAccepted = await Friend.updateMany({ $or: [{ friendId: myId, myId: friendId }, { friendId: friendId, myId: myId }] }, { $set: { statusOfRequest: 'ACCEPTED' } }).lean();

        if (requestAccepted) {
            res.status(201).send({ statusCode: 201, msg: 'Request accepted successfully', requestAccepted });
        }
        else {
            res.status(400).send({ statusCode: 400, msg: 'Something went wrong' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const unFollowUser = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const myId = req.user.userId;

        const users = await Friend.find({ $or: [{ friendId: myId, myId: friendId }, { friendId: friendId, myId: myId }] }).lean();
        if (users && users.length === 2) {
            await Friend.deleteOne({ friendId, myId, statusOfRequest: 'ACCEPTED' });
            await Friend.deleteOne({ friendId: myId, myId: friendId, statusOfRequest: 'ACCEPTED' });
            return res.status(203).send({ statusCode: 203, msg: 'Unfollow user successfully' });
        }
        else {
            return res.status(404).send({ statusCode: 404, msg: 'User not found' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

export const rejectRequest = async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const myId = req.user.userId;

        const users = await Friend.find({ $or: [{ friendId: myId, myId: friendId, statusOfRequest: "PENDING" }, { friendId: friendId, myId: myId, statusOfRequest: "REQUEST" }] }).lean();

        if (users && users.length === 2) {
            const result = await Friend.deleteMany({
                $or: [
                    { friendId: myId, myId: friendId, statusOfRequest: "PENDING" },
                    { friendId: friendId, myId: myId, statusOfRequest: "REQUEST" }
                ]
            });
            if (result) {
                res.status(200).send({ statusCode: 200, msg: 'Request rejected successfully' });
            }
            else {
                res.status(404).send({ statusCode: 404, msg: 'User not found' });
            }
        }
        else {
            res.status(400).send({ statusCode: 400, msg: 'Something went wrong' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const getPendingRequest = async (req, res) => {
    try {
        const myId = req.user.userId;

        const requests = await Friend.find({ myId, statusOfRequest: 'PENDING' });

        if (requests && requests.length > 0) {
            res.status(200).send({ statusCode: 200, msg: 'Pending request fetched', requests });
        }
        else {
            res.status(203).send({ statusCode: 203, msg: 'No request found' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const myId = req.user.userId;

        // const requests = await Friend.find({ myId, statusOfRequest: 'REQUEST' });
        const requests = await Friend.aggregate([
            {
                $match: {
                    myId: new mongoose.Types.ObjectId(myId),
                    statusOfRequest: 'REQUEST'
                }
            },
            {

                $lookup: {
                    from: 'users',
                    localField: 'friendId',
                    foreignField: '_id',
                    as: 'friend'
                }
            },
            {
                $unwind: '$friend' // Unwind the friend array to get a single object
            }
        ]);

        if (requests && requests.length > 0) {
            res.status(200).send({ statusCode: 200, msg: 'Friend request fetched', requests });
        }
        else {
            res.status(203).send({ statusCode: 203, msg: 'No request found' });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const getFriends = async (req, res) => {
    try {
        const myId = req.user.userId;

        // const requests = await Friend.find({myId, statusOfRequest : 'ACCEPTED'});
        const requests = await Friend.aggregate([
            {
                $match: {
                    myId: new mongoose.Types.ObjectId(myId),
                    statusOfRequest: 'ACCEPTED'
                }
            },
            {

                $lookup: {
                    from: 'users',
                    localField: 'friendId',
                    foreignField: '_id',
                    as: 'friend'
                }
            },
            {
                $unwind: '$friend' // Unwind the friend array to get a single object
            }
        ]);

        if (requests && requests.length > 0) {
            res.status(200).send({ statusCode: 200, msg: 'Friend request fetched', requests });
        }
        else {
            res.status(203).send({ statusCode: 203, msg: 'No request found' });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

export const countOfRequests = async (req, res) => {
    try {
        const counts = await Friend.find({ myId: req.user.userId, statusOfRequest: 'REQUEST' }).count();

        if (counts) {
            res.status(200).send({ statusCode: 200, msg: 'Your friends count fetched', counts });
        }
        else {
            res.status(203).send({ statusCode: 203, msg: "You don't have any friend request" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

