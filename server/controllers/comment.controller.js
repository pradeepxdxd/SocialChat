import Comment from "../models/comment.js";
import Reply from "../models/reply.js"

export const doComment = async (req, res) => {
    try {
        const {posterId} = req.query;

        const {comment} = req.body;

        const commenterId = req.user.userId;

        const com = await Comment.create({commenterId, posterId, comment});

        if (com) {
            res.status(201).send({statusCode : 201, msg : 'Post Commented Successfully'});
        }
        else {
            res.status(400).send({statusCode : 400, msg : 'Something went wrong'});
        }
    } 
    catch (error) {
        res.status(500).send({msg : 'Internal Server Error'})
    }
}

export const removeComment = async (req, res) => {
    try {
        const removedComment = await Comment.findByIdAndDelete(req.params.commentId);

        if (removedComment){
            await Reply.deleteMany({commentId : req.params.commentId});
            return res.status(204).send({statusCode : 204, msg : 'comment deleted successfully'})
        }
        else {
            return res.status(400).send({statusCode : 400, msg : 'Something went wrong'})
        }
    } 
    catch (error) {
        res.status(500).send({statusCode : 500, msg : "Internal Server Error"})
    }
}

export const replyComment = async (req, res) => {
    try {
        const {posterId, commentId, postId} = req.query;

        const {comment} = req.body;

        const reply = await Reply.create({posterId, comment, commentId, postId});

        if (reply) {
            res.status(201).send({statusCode : 201, msg : 'Commented on Reply Successfully'});
        }
        else{
            res.status(400).send({statusCode : 400, msg : 'Something went wrong'});
        }
    } 
    catch (error) {
        res.status(500).send({statusCode : 500, msg : 'Internal Server Error'})
    }
}

