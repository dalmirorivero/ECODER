// CAPA DE PERSISTENCIA 1

import { Types } from 'mongoose';
import Cart from '../../models/cart.js';

export default class CartMongo {
  constructor() { }

  async createModel(data) {
    let one = await Cart.create(data)
    return {
      message: 'Cart created.',
      response: { store_id: one._id }
    }
  };

  async filterModels(user_id, state) {
    let all = await Cart.find(
      { user_id, state },
      "product_id user_id quantity state"
    )
      .populate("user_id", "name mail url_photo")
      .populate("product_id");
    if (all.length > 0) {
      return {
        message: "products found!",
        response: { products: all },
      };
    } else {
      return null;
    }
  }

  async updateModel(id, data) {
    let one = await Cart.findByIdAndUpdate(id, data, { new: true })
      .select("product_id user_id quantity state")
      .populate("user_id", "name mail url_photo")
      .populate("product_id", "-createdAt -updatedAt -__v");
    if (one) {
      return {
        message: "product updated!",
        response: { product: one },
      };
    } else {
      return null;
    }
  }
  async destroyModel(id) {
    let one = await Cart.findByIdAndDelete(id)
      .select("product_id user_id quantity state")
      .populate("user_id", "name mail url_photo")
      .populate("product_id", "-createdAt -updatedAt -__v");
    if (one) {
      return {
        message: "product removed!",
        response: { product: one },
      };
    } else {
      return null;
    }
  }

  async readAllModel(page) {
    let all = await Cart.paginate({}, { page, limit: 10 });
    if (all) {
      return {
        message: "orders read",
        response: all,
      };
    } else {
      return null;
    }
  }

  async gainModel(user_id) {
    let carts = await Cart.find({user_id}, '-_id')
    let gain = await Cart.aggregate([
      { $match: { user_id: new Types.ObjectId(user_id) } },
      { $set: { subtotal: { $multiply: ['$price','$quantity'] } } },
      { $group: { _id: '$user_id', total: { $sum: '$subtotal'} } },
      { $project: { _id: 0, user_id: '$_id', total: '$total', date: new Date(), carts }},
      { $merge: { into: 'gains' } }
    ])
    return {
      return: gain,
      message: 'Gain collection created'
    }
  }
};