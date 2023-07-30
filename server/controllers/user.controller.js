import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js'
import { sendMail, sendMailHandlebar } from '../services/mail.js'
import { decodeAndHashPassword, decodePassword, hashPassword } from '../services/decodePassword.js';
import { createToken } from '../services/token.js';

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
            const token = createToken({ userId: userEmail._id, name: userEmail.name }, process.env.SECRET_KEY, '24h');
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
        const user = await User.findById(req.user.userId);

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
                statusCode : 401,
                msg : 'Invalid Email and Password'
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
        const email =  req.body.email;
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
                text : `http://localhost:3000/reset_password/${token}`
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
    try{
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
                statusCode : 422,
                msg : 'please provide password'
            })
        }
        const updatePass = await User.findByIdAndUpdate(userId, {password : hashPass}, {new : true});

        if (updatePass) {
            res.status(201).send({
                statusCode : 201,
                msg : 'Password changed successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode : 400,
                msg : 'Something went wrong, please try again'
            })
        }

    }
    catch(err) {
        res.status(500).send({
            statusCode : 500,
            msg : 'Internal Server Error'
        })
    }
}

export const editProfile = async (req, res) => {
    try{
        const userId = req.user.userId;
        const {name, email, phone, address} = req.body
        const user = await User.findByIdAndUpdate(userId, {name, email, phone, address}, {new : true});

        if (req.file) {
            user.profileImg = req.protocol + '://' + req.get('host') + '/uploads/profileimage/' + req.file.filename;
            await user.save();
        }

        if (user) {
            res.status(204).send({
                statusCode : 204,
                msg : 'User profile updated successfully'
            })
        }
        else {
            res.status(400).send({
                statusCode : 400,
                msg : 'Something went wrong, please try again'
            })
        }
    }
    catch(err) {
        res.status(500).send({
            statusCode : 500,
            msg : 'Internal Server Error'
        })
    }
}

export const mailDemo = async (req, res) => {
    try{
        sendMailHandlebar(res, 'pradeepbiswas41813@gmail.com', 'mail aaya kya');
    }
    catch(err) {
        res.status(500).send({
            statusCode : 500,
            msg : 'Internal Server Error'
        })
    }
}
