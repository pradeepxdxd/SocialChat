import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12)
}

export const decodePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
}

export const decodeAndHashPassword = async (currentPassword, newPassword, storedPassword) => {
    const decryptPassword = await decodePassword(currentPassword, storedPassword);
    if (!decryptPassword) {
        return null;
    }
    else {
        return await hashPassword(newPassword);
    }
}
