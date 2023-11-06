import dotenv from 'dotenv';
import program from './arguments.js'

const environment = program.mode;
const path = environment === "dev" ? "./.env.dev" : "./.env.prod";
dotenv.config({ path });

export default {
    DBURI: process.env.DBURI,
    SECRETCOOKIE: process.env.SECRETCOOKIE,
    SECRETSESSION: process.env.SECRETSESSION,
    SECRETKEY: process.env.SECRETKEY,
    GPASSWORD: process.env.GPASSWORD,
    GMAIL: process.env.GMAIL
};