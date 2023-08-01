import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
                if (err){
                    res.status(403).send({
                        statusCode : 400,
                        msg : 'Something went wrong, token has expired'
                    })
                } 
                else if (!decode) {
                    res.status(403).send({
                        statusCode : 401,
                        msg : 'User not authorized'
                    })
                }
                else {
                    req.user = decode;
                    next();
                }
            })
        }   
        else {
            res.status(403).send({
                statusCode : 403,
                msg : 'invalid jwt token'
            })
        }
    }
    catch(err) {
        res.status(403).send({
            statusCode : 403,
            msg : 'invalid jwt token'
        })
    }
}
