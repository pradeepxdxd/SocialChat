import { transporter } from '../utils/nodemailer.js'
import { transporterHandlebars } from '../utils/handlebars.js'

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

export const sendMailHandlebar = async (res, from, to, subject, template, context) => {
    const mailOptions = {
        from,
        to,
        subject,
        // template : 'email',
        template,
        context
    }

    transporterHandlebars.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res.status(400).send({
                statusCode : 400,
                msg : 'Something went wrong, please try again'
            })
        }
        else {
            return res.status(200).send({
                statusCode : 200,
                msg : 'Mail sent successfully'
            })
        }
    })
}