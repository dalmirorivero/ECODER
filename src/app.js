// IMPORTACIONES

import express from 'express';
import passport from 'passport';
import __dirname from './utils.js';
import config from './config/config.js';
import cookieParser from 'cookie-parser';
import IndexRouter from './router/index.js'
import compression from 'express-compression';
import winston from './middlewares/winston.js';
import sessions from './config/session/factory.js';
import initializePassport from './config/passport.js'
import error_handler from './middlewares/errorHandler.js';
import not_found_handler from './middlewares/notFound.js';

import swaggerJSDoc from 'swagger-jsdoc';
import { serve,setup } from 'swagger-ui-express';
import swaggerOptions from './config/swagger.js';

// SERVIDOR

const app = express();

// MIDDLEWARES
app.use(winston);
app.use(express.json());
app.use(express.static((`${__dirname}/public`)));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRETCOOKIE));
app.use(compression({
    brotli: { enabled: true, zlib: {} },
}));

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", serve, setup(specs));

// PASSPORT

initializePassport()
app.use(sessions);
app.use(passport.initialize());
app.use(passport.session());

// ENRUTADOR

const router = new IndexRouter();
app.use('/api', router.getRouter());
app.use(error_handler);
app.use(not_found_handler);

export default app;