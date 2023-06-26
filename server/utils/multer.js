import multer from "multer"
import path from 'path'

const profileImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profileimage');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const postsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/posts');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const profileImageUpload = multer({ storage: profileImageStorage });
const postsUpload = multer({storage : postsStorage});

export {profileImageUpload, postsUpload};
