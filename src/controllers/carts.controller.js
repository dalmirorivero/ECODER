import CartService from '../services/carts.service.js';

const service = new CartService();

const cartController = {
  createController: async (req, res, next) => {
    try {
      let user = req.user;
      let data = req.body;
      data.user_id = user._id;
      let response = await service.createService(data);
      return res.sendSuccessCreate(response);
    } catch (error) {
      error.where = " cart controller "
      next(error);
    }
  },

  filterController: async (req, res, next) => {
    try {
      let user_id = req.user._id;
      let state = "pending"; //por default que state='pending'
      if (req.query.state) {
        state = req.query.state;
      }
      let response = await service.filterService(user_id, state);
      if (response) {
        return res.sendSuccess(response);
      } else {
        return res.sendNotFound("cart");
      }
    } catch (error) {
      error.where = " cart controller "
      next(error);
    }
  },

  updateController: async (req, res, next) => {
    try {
      let cart_id = req.params.id;
      let data = req.body;
      let response = await service.updateService(cart_id, data);
      if (response) {
        return res.sendSuccess(response);
      } else {
        return res.sendNotFound("cart");
      }
    } catch (error) {
      error.where = " cart controller "
      next(error);
    }
  },

  destroyController: async (req, res, next) => {
    try {
      let cart_id = req.params.id;
      let response = await service.destroyService(cart_id);
      if (response) {
        return res.sendSuccess(response);
      } else {
        return res.sendNotFound("cart");
      }
    } catch (error) {
      error.where = " cart controller "
      next(error);
    }
  },

  readAllController: async (req, res, next) => {
    try {
      let page = req.query.page || 1
      let response = await service.readAllService(page);
      if (response) {
        return res.sendSuccess(response)
      } else {
        return res.sendNotFound('carts')
      }
    } catch (error) {
      error.where = " cart controller "
      next(error)
    }
  },

  gainController: async (req, res, next) => {
    try {
      let user_id = req.user._id
      console.log(user_id);
      let response = await service.gainService(user_id);
      if (response) {
        return res.sendSuccess(response)
      } else {
        return res.sendNotFound('carts')
      }
    } catch (error) {
      error.where = " cart controller "
      next(error)
    }
  }
};

export default cartController;