import jwt from 'jsonwebtoken'

export const createToken = (payload, secretKey, expiresIn='24h') => {
    return jwt.sign(payload, secretKey, {expiresIn : expiresIn});
}
