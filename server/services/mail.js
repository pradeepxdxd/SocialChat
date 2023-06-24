import { transporter } from '../utils/nodemailer.js'

export const sendMail = async (req, res, options) => {
    transporter.sendMail(options, (err, info) => {
        if (err) {
            res.status(400).send({
                statusCode : 400,
                msg : 'Something went wrong, mail did not sent, please try again'
            })
        }
        else {
            res.status(200).send({
                statusCode : 200,
                msg : 'Mail sent successfully'
            })
        }
    })
}
