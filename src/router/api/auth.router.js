import passport from "passport";
import BaseRouter from "../base.js";
import valid_user from "../../middlewares/valid_user.js";
import user_exist from "../../middlewares/user_exist.js";
import valid_pass from "../../middlewares/valid_pass.js";
import create_token from "../../middlewares/create_token.js";
import authController from "../../controllers/users.controller.js";

export default class AuthRouter extends BaseRouter {
    init() {
        // REGISTRO ( http://localhost:8080/api/auth/register )
        this.create('/register', valid_user, authController.registerController);

        // INICIO DE SESION ( http://localhost:8080/api/auth/login )
        this.create('/login', user_exist, valid_pass, create_token, authController.loginController);

        // CIERRE DE SESION ( http://localhost:8080/api/auth/logout )
        this.create('/logout', passport.authenticate('jwt'), authController.logoutController);

        // CIERRE DE SESION ( http://localhost:8080/api/auth/ )
        this.read('/', authController.readController);
    }
};