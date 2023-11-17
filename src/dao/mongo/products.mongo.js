// CAPA DE PERSISTENCIA 1

import Product from '../../models/product.js';

export default class ProductMongo {
    constructor() { }

    async createModel(data, next) {
        try {
            let one = await Product.create(data)
            return {
                message: 'Product created.',
                response: { product_id: one._id, price: one.price }
            }
        } catch {
            error.where = "products persistence mongo"
            return next(error)
        }
    };

    async readModel(next) {
        try {
            let all = await Product.find()
            if (all.length > 0) {
                return {
                    message: 'Products found.',
                    response: { products: all }
                }
            } else {
                return null;
            }
        } catch {
            error.where = "products persistence mongo"
            return next(error)
        }
    };

    async readOneModel(id, next) {
        try {
            let one = await Product.findById(id)
            if (one) {
                return {
                    message: 'Product found.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "products persistence mongo"
            return next(error)
        }
    };

    async updateModel(id, data, next) {
        try {
            let one = await Product.findByIdAndUpdate(id, data, { new: true })
            if (one) {
                return {
                    message: 'Product updated.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "products persistence mongo"
            return next(error)
        }
    };

    async destroyModel(id, next) {
        try {
            let one = await Product.findByIdAndDelete(id)
            if (one) {
                return {
                    message: 'Product deleted.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "products persistence mongo"
            return next(error)
        }
    };
};