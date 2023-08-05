import mongoose from "mongoose";
import Comment from "../models/comment.js";
import Reply from "../models/reply.js";

export const doComment = async (req, res) => {
    try {
        const { posterId, postId } = req.query;

        const { comment } = req.body;

        const commenterId = req.user.userId;

        const com = await Comment.create({
            commenterId,
            posterId,
            comment,
            postId,
        });

        if (com) {
            res
                .status(201)
                .send({ statusCode: 201, msg: "Post Commented Successfully", data: com });
        } else {
            res.status(400).send({ statusCode: 400, msg: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

export const removeComment = async (req, res) => {
    try {
        const removedComment = await Comment.findByIdAndDelete(
            req.params.commentId
        );

        if (removedComment) {
            await Reply.deleteMany({ commentId: req.params.commentId });
            return res
                .status(204)
                .send({ statusCode: 204, msg: "comment deleted successfully" });
        } else {
            return res
                .status(400)
                .send({ statusCode: 400, msg: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).send({ statusCode: 500, msg: "Internal Server Error" });
    }
};

export const doReplyComment = async (req, res) => {
    try {
        const { posterId, commentId, postId } = req.query; // by comment id you can find reply of comments

        const { comment } = req.body;

        const commenterId = req.user.userId;

        const reply = await Reply.create({
            posterId,
            comment,
            commentId,
            postId,
            commenterId,
        });

        if (reply) {
            res
                .status(201)
                .send({ statusCode: 201, msg: "Commented on reply successfully", data: reply });
        } else {
            res.status(400).send({ statusCode: 400, msg: "Something went wrong" });
        }
    } catch (error) {
        res.status(500).send({ statusCode: 500, msg: "Internal Server Error" });
    }
};

// pagination
export const getComment = async (req, res) => {
    try {
        const postId = req.query.postId;
        const data = await Comment.aggregate([
            {
                $match: {
                    postId: new mongoose.Types.ObjectId(postId),
                },
            },
            // { $sort: { createdAt: -1 } },
            {
                $lookup: {
                    from: "users",
                    localField: "commenterId",
                    foreignField: "_id",
                    as: "userDetails",
                },
            },

            { $unwind: "$userDetails" },

            {
                $lookup: {
                    from: "replies", // Use the correct collection name for replies
                    localField: "_id", // Use the correct field for joining (commentId)
                    foreignField: "commentId", // Use the correct field in the replies collection
                    as: "replies",
                },
            },

            {
                $project: {
                    _id: 1,
                    postId: 1,
                    posterId: 1,
                    commenterId: 1,
                    comment: 1,
                    userDetails: 1,
                    replyCount: { $size: "$replies" }, // Add the replyCount field
                },
            },
        ]);

        if (data && data.length > 0) {
            res
                .status(200)
                .send({
                    statusCode: 200,
                    msg: "Comment fetched successfully",
                    data,
                });
        }
        else {
            res.status(203).send({ statusCode: 203, msg: "No comment found" });
        }
    } catch (error) {
        res.status(500).send({ statusCode: 500, msg: "Internal Server Error" });
    }
};

// don't erace it's important
// export const getComment = async (req, res) => {
//     const postId = req.query.postId;
//     const page = parseInt(req.query.page) || 1;
//     const limit = 3;
//     const skip = (page - 1) * limit;

//     try {
//         const data = await Comment.aggregate([
//             {
//                 $match: {
//                     postId: new mongoose.Types.ObjectId(postId),
//                 },
//             },
//             // Sort by createdAt in descending order
//             { $sort: { createdAt: -1 } },

//             // Skip the specified number of documents
//             { $skip: skip },

//             // Limit the number of documents to be retrieved
//             { $limit: limit },

//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "commenterId",
//                     foreignField: "_id",
//                     as: "userDetails",
//                 },
//             },

//             { $unwind: "$userDetails" },
//         ]);

//         if (data && data.length > 0) {
//             res
//                 .status(200)
//                 .send({
//                     statusCode: 200,
//                     msg: "Comment fetched successfully",
//                     data,
//                 });
//         }
//         else {
//             res.status(203).send({ statusCode: 203, msg: "No comment found" });
//         }
//     } catch (error) {
//         res.status(500).send({ statusCode: 500, msg: "Internal Server Error" });
//     }
// };

export const getReply = async (req, res) => {
    try {
        const commentId = req.query.commentId;

        const data = await Reply.aggregate([
            {
                $match: {
                    commentId: new mongoose.Types.ObjectId(commentId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'commenterId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails'
            }
        ]);

        if (data && data.length > 0) {
            res.status(200).send({ statusCode: 200, msg: 'Replies of comment fetched successfully', data });
        }
        else {
            res.status(404).send({ statusCode: 404, msg: 'No replies' })
        }
    }
    catch (error) {
        res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' })
    }
}

// don't erace it's important
// export const getReply = async (req, res) => {
//     try {
//         const commentId = req.query.commentId;
//         const page = parseInt(req.query.page) || 1;
//         const limit = 3;
//         const skip = (page - 1) * limit;

//         const data = await Reply.aggregate([
//             {
//                 $match: {
//                     commentId: new mongoose.Types.ObjectId(commentId)
//                 }
//             },
//             // Skip the specified number of documents
//             { $skip: skip },

//             // Limit the number of documents to be retrieved
//             { $limit: limit },
//         ]);

//         if (data && data.length > 0) {
//             res.status(200).send({ statusCode: 200, msg: 'Replies of comment fetched successfully', data });
//         }
//         else {
//             res.status(404).send({ statusCode: 404, msg: 'No replies' })
//         }
//     }
//     catch (error) {
//         res.status(500).send({ statusCode: 500, msg: 'Internal Server Error' })
//     }
// }