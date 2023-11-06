import BaseRouter from '../base.js';
import CartController from '../../controllers/carts.controller.js';
import passport from 'passport';
import valid_role from '../../middlewares/valid_role.js';

const cartsController = new CartController;

export default class CartRouter extends BaseRouter {
  init() {
    this.create("/", passport.authenticate('jwt'), valid_role, async (req, res, next) => {
      try {
        let user = req.user;
        let data = req.body;
        data.user_id = user._id;
        let response = await cartsController.createController(data);
        return res.sendSuccessCreate(response);
      } catch (error) {
        next(error);
      }
    });
    this.read("/", passport.authenticate('jwt'), async (req, res, next) => {
      try {
        let user_id = req.user._id;
        let state = "pending"; //por default que state='pending'
        if (req.query.state) {
          state = req.query.state;
        }
        let response = await cartsController.filterController(user_id, state);
        if (response) {
          return res.sendSuccess(response);
        } else {
          return res.sendNotFound("cart");
        }
      } catch (error) {
        next(error);
      }
    });
    this.update(
      "/:id",
      passport.authenticate('jwt'), valid_role,
      async (req, res, next) => {
        try {
          let cart_id = req.params.id;
          let data = req.body;
          let response = await cartsController.updateController(cart_id, data);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound("cart");
          }
        } catch (error) {
          next(error);
        }
      }
    );
    this.delete(
      "/:id",
      passport.authenticate('jwt'), valid_role,
      async (req, res, next) => {
        try {
          let cart_id = req.params.id;
          let response = await cartsController.destroyController(cart_id);
          if (response) {
            return res.sendSuccess(response);
          } else {
            return res.sendNotFound("cart");
          }
        } catch (error) {
          next(error);
        }
      }
    );
    this.read("/all", async (req, res, next) => {
      try {
        let page = req.query.page || 1
        let response = await cartsController.readAllController(page)
        if (response) {
          return res.sendSuccess(response)
        } else {
          return res.sendNotFound('carts')
        }
      } catch (error) {
        next(error)
      }
    })
    this.read("/gain",passport.authenticate('jwt'), async (req, res, next) => {
      try {
        //let user_id = "654813811d5c524c627c0138"
        let user_id = req.user._id
        console.log(user_id);
        let response = await cartsController.gainController(user_id)
        if (response) {
          return res.sendSuccess(response)
        } else {
          return res.sendNotFound('carts')
        }
      } catch (error) {
        next(error)
      }
    })
  }
}