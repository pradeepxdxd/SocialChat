import mongoose from 'mongoose';
import Like from '../models/like.js'

export const postLikeAndUnLike = async (req, res) => {
    try {
        const {posterId, postId} = req.query;
        const likerId = req.user.userId;

        const ifLiked = await Like.findOneAndDelete({posterId, postId, likerId});

        if (ifLiked) {
            return res.status(200).send({
                statusCode : 200,
                msg : 'Post Unliked Successfully'
            })
        }

        const postLiked = await Like.create({posterId, postId, likerId});

        if(postLiked) {
            res.status(201).send({
                statusCode : 201,
                msg : 'Post Liked Successfully'
            })
        }
    } 
    catch (error) {
        res.status(500).send({msg : 'Internal Server Error'});
    }
}

export const countLikeOfPost = async (req, res) => {
    try{
        const count = await Like.find({postId:req.params.postId}).count().lean();

        if (count) {
            res.status(200).send({
                msg : 'count fetch successfully',
                count
            })
        }
    }
    catch(err){
        res.status(500).send({msg : err.message})
    }
}

export const getUsersWhoLike = async (req, res) => {
    try {
        const postId = req.params.postId;
        
        const users = await Like.aggregate([
            {
                $match : {
                    postId : new mongoose.Types.ObjectId(postId)
                }
            },
            {
                $lookup : {
                    from : 'users',
                    localField : 'likerId',
                    foreignField : '_id',
                    as : 'userDetails'
                }
            },
            {
                $unwind : '$userDetails'
            },
            {
                $project : {
                    'userDetails.name' : 1,
                    'userDetails._id' : 1
                }
            }
        ])

        if (users) {
            res.status(200).send({
                msg : 'Users get successfully',
                users
            })
        }
        res.send(users)
    }
    catch (error) {
        res.status(500).send({msg : error.message});
    }
}