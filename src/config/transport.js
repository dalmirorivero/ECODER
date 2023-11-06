import { createTransport } from "nodemailer";
import args from './arguments.js';
import config from './config.js';

const port = process.env.PORT || args.p

export default createTransport({
    service: 'gmail',
    port: port,
    auth: {
        user: config.GMAIL,
        pass: config.GPASSWORD
    }
});