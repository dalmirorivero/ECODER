import BaseRouter from "../base.js";
import AuthController from '../../controllers/users.controller.js'
import create_token from "../../middlewares/create_token.js";
import passport from "passport";
import valid_user from "../../middlewares/valid_user.js";
import user_exist from "../../middlewares/user_exist.js";
import valid_pass from "../../middlewares/valid_pass.js";

const controller = new AuthController();

export default class AuthRouter extends BaseRouter {
    init() {

        // REGISTRO ( http://localhost:8080/mvc/auth/fakereg )
        this.create('/fakereg', valid_user, async (req, res, next) => {
            try {
                let data = req.body;
                let response = await controller.registerController(data);
                if (response) {
                    return res.status(201).json({
                        message: 'User created.',
                        response: response
                    })
                } else {
                    return null
                }
            } catch (error) {
                next(error);
            }
        })
        // INICIO DE SESION ( http://localhost:8080/mvc/auth/fakein )
        this.create('/fakein', user_exist, valid_pass, create_token, async (req, res, next) => {
            try {
                req.session.mail = req.body.mail;
                req.session.role = req.user.role;
                let response = await controller.loginController()
                if (response) {
                    return res
                    .cookie('token', req.session.token, {
                        maxAge: 60 * 60 * 24 * 7 * 1000
                    })
                    .sendSuccess(response)
                } else {
                    return res.sendNotFound("user");
                }
            } catch (error) {
                next(error)
            }
        })
        // CIERRE DE SESION ( http://localhost:8080/mvc/auth/fakeon )
        this.create('/fakeon', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                req.session.destroy()
                let response = await controller.logoutController()
                if (response) {
                    return res.status(200).clearCookie('token').json({
                        message: 'User logout',
                        response: response
                    })
                } else {
                    return res.clearCookie('token').sendNotFound('user')
                  }
            } catch (error) {
                next(error)
            }
        })

        this.read('/', async (req, res, next) => {
            try {
                let response = await controller.readController()
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound("users")
                }
            } catch (error) {
                next(error)
            }
        });
       }
}