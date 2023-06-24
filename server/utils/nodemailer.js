import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    service : 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
    },
});

export {transporter}
