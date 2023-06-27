import 'dotenv/config.js'
import path from 'path';
import hbs from 'nodemailer-express-handlebars'
import {transporter} from './nodemailer.js'

const handlebarOptions = {
    viewEngine : {
        extName : '.handlebars',
        partialsDir : path.resolve('./email-template'),
        defaultLayout : false
    },
    viewPath : path.resolve('./email-template'),
    extName : '.handlebars'
}

const transporterHandlebars = transporter.use('compile', hbs(handlebarOptions));

export {transporterHandlebars}
