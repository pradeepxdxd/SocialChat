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
export const getMyPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ userId: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean();

        const totalPost = await Post.countDocuments({ userId: req.user.userId });

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
};

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
