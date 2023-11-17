import ProductService from '../services/products.service.js';

const service = new ProductService();

const productController = {
    createController: async (req, res, next) => {
        try {
            let data = req.body
            let response = await service.createService(data)
            return res.sendSuccessCreate(response)
        } catch (error) {
            error.where = " product controller "
            next(error)
        }
    },

    readController: async (req, res, next) => {
        try {
            let response = await service.readService()
            if (response) {
                return res.sendSuccess(response)
            } else {
                return res.sendNotFound("product")
            }
        } catch (error) {
            error.where = " product controller "
            next(error)
        }
    },

    readOneController: async (req, res, next) => {
        try {
            let { id } = req.params
            let response = await service.readOneService(id)
            if (response) {
                return res.sendSuccess(response)
            } else {
                return res.sendNotFound("product")
            }
        } catch (error) {
            error.where = " product controller "
            next(error)
        }
    },

    updateController: async (req, res, next) => {
        try {
            let { id } = req.params;
            let data = req.body;
            let response = await service.updateService(id, data)
            if (response) {
                return res.sendSuccess(response)
            } else {
                return res.sendNotFound("product")
            }
        } catch (error) {
            error.where = " product controller "
            next(error)
        }
    },

    deleteController: async (req, res, next) => {
        try {
            let { id } = req.params;
            let response = await service.deleteService(id)
            if (response) {
                return res.sendSuccess(response)
            } else {
                return res.sendNotFound("product")
            }
        } catch (error) {
            error.where = " product controller "
            next(error)
        }
    }
};

export default productController;