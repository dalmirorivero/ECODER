// CAPA DE PERSISTENCIA 1

import Product from './products.memory.js';
import User from './auth.memory.js';

export default class Cart {
    constructor() {
        this.carts = []
    }

    async createModel(data){
        const users = new User()
        const products = new Product()

        data.user_id = users.readByIdModel(data.user_id)?.response
        data.product_id = products.readOneModel(data.product_id)
        this.carts.push(data)
        return {
            message: "Product added.",
            response: {store_id: data._id}
        }
    }

    filterModels(user_id, state) {
        let all = this.carts.filter(
          (each) => each.user_id._id == user_id && each.state == state
        );
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
        try {
          let one = this.carts.find((each) => each._id === id);
          if (one) {
            for (let prop in data) {
              one[prop] = data[prop];
            }
            one.__v++;
            one.updatedAt = new Date();
            return {
              message: "product updated!",
              response: { product: one },
            };
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      async destroyModel(id) {
        try {
          let one = this.carts.find((each) => each._id == id);
          if (one) {
            this.carts = this.carts.filter((each) => each._id !== id);
            return {
              message: "product removed!",
              response: { product: one },
            };
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
}