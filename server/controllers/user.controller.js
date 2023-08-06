import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js'
import { sendMail, sendMailHandlebar } from '../services/mail.js'
import { decodeAndHashPassword, decodePassword, hashPassword } from '../services/decodePassword.js';
import { createToken } from '../services/token.js';
import Friend from '../models/Friends.js'

export const regis = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            res.status(409).send({
                statusCode: 409,
                msg: 'user already exist'
            })
        }

        else {
            const url = req.protocol + '://' + req.get('host') + '/uploads/profileimage/' + req.file.filename;
            const hashPass = await hashPassword(password);
            await User.create({ name, email, password: hashPass, phone, address, profileImg: url });

            res.status(201).send({
                statusCode: 201,
                msg: 'user registered successfully'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userEmail = await User.findOne({ email });

        if (!userEmail) {
            return res.status(401).send({
                statusCode: 401,
                msg: "Invalid email and password"
            })
        }

        const verifiedUser = await decodePassword(password, userEmail.password);

        if (!verifiedUser) {
            res.status(401).send({
                statusCode: 401,
                msg: 'Invalid email and password'
            })
        }
        else {
            const token = createToken({ userId: userEmail._id, name: userEmail.name }, process.env.SECRET_KEY, '30d');
            res.status(200).send({
                statusCode: 200,
                msg: 'User logged in successfully',
                token
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (user) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User data fetched',
                user
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'User not found'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'UnAuthorized user'
            })
        }
        const hashPass = await decodeAndHashPassword(currentPassword, newPassword, user.password);

        if (hashPass === null) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'Invalid Email and Password'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashPass }, { new: true });

        if (updatedUser) {
            res.status(201).send({
                statusCode: 201,
                msg: 'Password Changed Successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'User not found'
            })
        }

        const token = createToken({ userId: user._id, email: user.email }, process.env.SECRET_KEY, '1h');

        await sendMailHandlebar(
            res,
            process.env.EMAIL,
            email,
            'Reset Password',
            'email',
            {
                text: `http://localhost:3000/reset_password/${token}`
            }
        )
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'UnAuthorized user'
            })
        }

        const hashPass = await hashPassword(req.body.newPassword);
        if (!hashPass) {
            res.status(422).send({
                statusCode: 422,
                msg: 'please provide password'
            })
        }
        const updatePass = await User.findByIdAndUpdate(userId, { password: hashPass }, { new: true });

        if (updatePass) {
            res.status(201).send({
                statusCode: 201,
                msg: 'Password changed successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong, please try again'
            })
        }

    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email, phone, address } = req.body
        const user = await User.findByIdAndUpdate(userId, { name, email, phone, address }, { new: true });

        if (req.file) {
            user.profileImg = req.protocol + '://' + req.get('host') + '/uploads/profileimage/' + req.file.filename;
            await user.save();
        }

        if (user) {
            res.status(204).send({
                statusCode: 204,
                msg: 'User profile updated successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong, please try again'
            })
        }
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const mailDemo = async (req, res) => {
    try {
        sendMailHandlebar(res, 'pradeepbiswas41813@gmail.com', 'mail aaya kya');
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        })
    }
}

export const searchByName = async (req, res) => {
    try {
        const { name } = req.query;

        const users = await User.aggregate([
            {
                $match: {
                    name: { $regex: name, $options: "i" }
                }
            },
            {
                $lookup: {
                    from: 'friends',
                    let: { userId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$myId', '$$userId'] }
                            }
                        }
                    ],
                    as: 'requestStatus'
                }
            }
        ]);

        if (users && users.length > 0) {
            res.status(200).send({
                msg: 'Users fetched successfully',
                statusCode: 200,
                users
            });
        }
        else {
            res.status(404).send({
                msg: 'Users not found',
                statusCode: 404
            })
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.userId;
        const friendId = req.params.friendId;

        const pendingRequest = await Friend.findOne({ friendId, myId, statusOfRequest: 'PENDING' });
        if (pendingRequest) {
            await Friend.deleteOne({ friendId, myId, statusOfRequest: 'PENDING' });
            await Friend.deleteOne({ friendId: myId, myId: friendId, statusOfRequest: 'REQUEST' });
            return res.status(203).send({ statusCode: 203, msg: 'you withdrawl your request' });
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

        const requestAccepted = await Friend.updateMany({$or : [{friendId : myId, myId : friendId},{friendId : friendId, myId : myId}]}, {$set : {statusOfRequest : 'ACCEPTED'}}).lean();

        if (requestAccepted) {
            res.status(201).send({statusCode : 201, msg : 'Request accepted successfully', requestAccepted});
        }
        else{
            res.status(400).send({statusCode : 400, msg : 'Something went wrong'});
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

        const users = await Friend.find({$or : [{friendId : myId, myId : friendId},{friendId : friendId, myId : myId}]}).lean();
        if (users && users.length === 2){
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

        const users = await Friend.find({$or : [{friendId : myId, myId : friendId, statusOfRequest : "PENDING"},{friendId : friendId, myId : myId, statusOfRequest : "REQUEST"}]}).lean();

        if(users && users.length === 2) {
            const result = await Friend.deleteMany({
                $or: [
                    { friendId: myId, myId: friendId, statusOfRequest: "PENDING" },
                    { friendId: friendId, myId: myId, statusOfRequest: "REQUEST" }
                ]
            });
            if (result) {
                res.status(200).send({statusCode : 200, msg : 'Request rejected successfully'});
            }
            else {
                res.status(404).send({statusCode : 404, msg : 'User not found'});
            }
        }
        else{
            res.status(400).send({statusCode : 400, msg : 'Something went wrong'});
        }
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({statusCode : 500, msg : 'Internal Server Error'});
    }
}

