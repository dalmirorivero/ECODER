import passport from "passport";
import BaseRouter from "../base.js"
import valid_role from "../../middlewares/valid_role.js";
import cartController from "../../controllers/carts.controller.js";

export default class CartRouter extends BaseRouter {
  init() {
    this.create('/', passport.authenticate('jwt'), valid_role, cartController.createController);

    this.read('/', passport.authenticate('jwt'), cartController.filterController);

    this.update('/:id', passport.authenticate('jwt'), valid_role, cartController.updateController);

    this.delete('/:id', passport.authenticate('jwt'), valid_role, cartController.destroyController);
    
    this.read('/all', cartController.readAllController);

    this.read('/gain',passport.authenticate('jwt'), cartController.gainController);
  }
};