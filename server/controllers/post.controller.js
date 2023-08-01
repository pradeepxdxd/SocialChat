import mongoose from 'mongoose';
import like from '../models/like.js';
import Post from '../models/post.js'
import User from '../models/user.js'

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

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            res.status(200).send({
                statusCode: 200,
                msg: 'Post fetch successfully',
                post
            })
        }
        else {
            res.status(400).send({
                statusCode: 400,
                msg: 'Something went wrong'
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

// implement infinity scroll api
// export const getMyPosts = async (req, res) => {
//     try{
//         const page = parseInt(req.query.page) || 1;
//         const limit = 6;
//         const skip = (page - 1) * limit;

//         const posts = await Post.aggregate([
//             // Match documents with the specified userId
//             { $match: { userId: new mongoose.Types.ObjectId(req.user.userId) } },

//             // Sort by createdAt in descending order
//             { $sort: { createdAt: -1 } },

//             // Skip the specified number of documents
//             { $skip: skip },

//             // Limit the number of documents to be retrieved
//             { $limit: limit },

//             // Perform a left join with the Like collection
//             {
//                 $lookup: {
//                     from: 'likes',
//                     localField: '_id',
//                     foreignField: 'postId',
//                     as: 'likes'
//                 }
//             },

//             // Add a new field 'likeCount' that contains the count of likes for each post
//             {
//                 $addFields: {
//                     likeCount: { $size: '$likes' }
//                 }
//             },

//             // // Remove the 'likes' array from the output (optional, if not needed)
//             {
//                 $project: {
//                     likes: 0
//                 }
//             },

//             // Perform a left join with the User collection to fetch user details
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'userDetails'
//                 }
//             },

//             // Unwind the 'userDetails' array as we expect only one user per post
//             {
//                 $unwind: {
//                     path: '$userDetails',
//                     preserveNullAndEmptyArrays: true // This will preserve posts without matching users
//                 }
//             }
//         ]);

//         if (posts && posts.length > 0) {
//             res.status(200).send({
//                 statusCode: 200,
//                 msg: 'User posts fetched successfully',
//                 posts
//             });
//         } 
//         else {
//             res.status(404).send({
//                 statusCode: 404,
//                 msg: 'No posts found for the user'
//             });
//         }
//     }
//     catch(err){
//         res.status(500).send({msg : err.message});
//     }
// }

export const getMyPosts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const posts = await Post.aggregate([
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

            {
                $addFields: {
                    likers : '$likes'
                }
            },

            // Add a new field 'likeCount' that contains the count of likes for each post
            {
                $addFields: {
                    likeCount: { $size: '$likes' }
                }
            },

            // // Remove the 'likes' array from the output (optional, if not needed)
            {
                $project: {
                    likes: 0
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
                    preserveNullAndEmptyArrays: true // This will preserve posts without matching users
                }
            },
        ]);

        if (posts && posts.length > 0) {
            res.status(200).send({
                statusCode: 200,
                msg: 'User posts fetched successfully',
                posts
            });
        } 
        else {
            res.status(404).send({
                statusCode: 404,
                msg: 'No posts found for the user'
            });
        }
    }
    catch(err){
        res.status(500).send({msg : err.message});
    }
}

export const socialMediaDemo = async (req , res) => {
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
                countPost : posts.length,
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
