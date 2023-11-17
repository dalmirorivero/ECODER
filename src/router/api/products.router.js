import passport from "passport";
import BaseRouter from "../base.js";
import valid_role from "../../middlewares/valid_role.js";
import productController from "../../controllers/products.controller.js";

export default class ProductRouter extends BaseRouter {
    init() {
        this.create('/', passport.authenticate('jwt'), valid_role, productController.createController);

        this.read('/', passport.authenticate('jwt'), productController.readController);

        this.read('/:id', passport.authenticate('jwt'), productController.readOneController);

        this.update('/:id', passport.authenticate('jwt'), valid_role, productController.updateController);

        this.delete('/:id', passport.authenticate('jwt'), valid_role, productController.deleteController);
    }
};