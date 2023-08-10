import mongoose from 'mongoose';
import Post from '../models/post.js'
import User from '../models/user.js'
import Friend from '../models/Friends.js'

export const addPost = async (req, res) => {
    try {
        const { location, caption } = req.body;
        const url = req.protocol + '://' + req.get('host') + '/uploads/posts/' + req.file.filename;

        const post = await Post.create({ location, caption, post: url, userId: req.user.userId })

        if (post) {
            res.status(201).send({
                statusCode: 201,
                msg: 'Post add successfully'
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

export const socialMediaDemo = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const userId = '64994652d6582c1843b600f4';
        const posts = await Post.find({ userId: userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();

        const totalPost = await Post.countDocuments({ userId: userId });

        if (posts) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User posts fetched successfully',
                posts,
                countPost: posts.length,
                totalPost
            });
        } else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong'
            });
        }
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            msg: 'Internal Server Error'
        });
    }
}

export const editPost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'Unauthorized User'
            })
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (post) {
            res.status(201).send({
                statusCode: 201,
                msg: 'User post edited successfully'
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

export const deletePost = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                msg: 'Unauthorized User'
            })
        }

        const post = await Post.findByIdAndDelete(req.params.id);

        if (post) {
            res.status(204).send({
                statusCode: 204,
                msg: 'Post deleted successfully'
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

export const getMyPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const data = await Post.aggregate([
            // Match documents with the specified userId
            { $match: { userId: new mongoose.Types.ObjectId(req.user.userId) } },

            // Sort by createdAt in descending order
            { $sort: { createdAt: -1 } },

            // Skip the specified number of documents
            { $skip: skip },

            // Limit the number of documents to be retrieved
            { $limit: limit },

            // Perform a left join with the Like collection
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },

            // Calculate the likeCount
            {
                $addFields: {
                    likeCount: { $size: '$likes' }
                }
            },

            // Perform a left join with the Comment collection to get comment counts
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },

            // Calculate the commentCount
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },

            // Perform a left join with the Reply collection to get reply counts
            {
                $lookup: {
                    from: 'replies',
                    localField: 'comments._id',
                    foreignField: 'commentId',
                    as: 'replies'
                }
            },

            // Calculate the replyCount for each comment
            {
                $addFields: {
                    'comments.replyCount': { $size: '$replies' }
                }
            },
            {
                $project: {
                    comments: 0
                }
            },
            {
                $addFields: {
                    repliesCount: { $size: '$replies' }
                }
            },

            // Remove unnecessary fields from comments
            {
                $project: {
                    'comments.replies': 0,
                    'replies': 0,
                    // 'comments' : 0
                }
            },

            // Perform a left join with the User collection to fetch user details
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },

            // Unwind the 'userDetails' array as we expect only one user per post
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);

        if (data && data.length === 0 && req.query.page === 1) {
            res.status(202).send({
                statusCode: 202,
                msg: 'No post found',
                flag : true
            })
        }

        else if (data && data.length > 0) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User posts fetched successfully',
                data
            });
        } else {
            res.status(203).send({
                statusCode: 203,
                msg: 'No posts found for the user'
            });
        }
    }
    catch (err) {
        res.status(500).send({ msg: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const data = await Post.aggregate([
            // Match documents with the specified userId
            { $match: { userId: new mongoose.Types.ObjectId(req.query.userId) } },

            // Sort by createdAt in descending order
            { $sort: { createdAt: -1 } },

            // Skip the specified number of documents
            { $skip: skip },

            // Limit the number of documents to be retrieved
            { $limit: limit },

            // Perform a left join with the Like collection
            {
                $lookup: {
                    from: 'likes',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },

            // Calculate the likeCount
            {
                $addFields: {
                    likeCount: { $size: '$likes' }
                }
            },

            // Perform a left join with the Comment collection to get comment counts
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },

            // Calculate the commentCount
            {
                $addFields: {
                    commentCount: { $size: '$comments' }
                }
            },

            // Perform a left join with the Reply collection to get reply counts
            {
                $lookup: {
                    from: 'replies',
                    localField: 'comments._id',
                    foreignField: 'commentId',
                    as: 'replies'
                }
            },

            // Calculate the replyCount for each comment
            {
                $addFields: {
                    'comments.replyCount': { $size: '$replies' }
                }
            },
            {
                $project: {
                    comments: 0
                }
            },
            {
                $addFields: {
                    repliesCount: { $size: '$replies' }
                }
            },

            // Remove unnecessary fields from comments
            {
                $project: {
                    'comments.replies': 0,
                    'replies': 0,
                    // 'comments' : 0
                }
            },

            // Perform a left join with the User collection to fetch user details
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },

            // Unwind the 'userDetails' array as we expect only one user per post
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
        ]);

        if (data && data.length === 0 && req.query.page === 1) {
            res.status(202).send({
                statusCode: 202,
                msg: 'No post found',
                flag : true
            })
        }

        else if (data && data.length > 0) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User posts fetched successfully',
                data
            });
        } else {
            res.status(203).send({
                statusCode: 203,
                msg: 'No posts found for the user'
            });
        }
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
}

export const getCountsOfLikesAndFollowers = async (req, res) => {
    const userId = req.params.userId;
    try {
        let result = await Post.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: 'likes', // This should be the name of your "Like" model collection in your database
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'likes'
                }
            },
            {
                $addFields: {
                    likesCount: { $size: '$likes' }
                }
            },
            {
                $lookup: {
                    from: 'friends',
                    localField: 'userId',
                    foreignField: 'myId',
                    as: 'friends'
                }
            },
            {
                $group: {
                    _id: null,
                    totalPosts: { $sum: 1 },
                    totalLikes: { $sum: '$likesCount' },
                }
            }
        ]);

        const followerCounts = await Friend.find({ myId: userId, statusOfRequest: 'ACCEPTED' }).count();

        if (result.length === 0) {
            result = [{ totalPosts: 0, totalLikes: 0 }]
            res.status(200).send({ statusCode: 200, msg: 'Counts have been fetched', result, followerCounts });
        }
        else if (result && followerCounts) {
            res.status(200).send({ statusCode: 200, msg: 'Counts have been fetched', result, followerCounts });
        }
        else {
            res.status(404).send({ statusCode: 404, msg: 'No counts found' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' });
    }
}

