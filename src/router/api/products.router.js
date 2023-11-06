import BaseRouter from '../base.js';
import ProductController from '../../controllers/products.controller.js';
import passport from 'passport';
import valid_role from '../../middlewares/valid_role.js';


const productController = new ProductController();

export default class ProductRouter extends BaseRouter {
    init() {
        this.create('/', passport.authenticate('jwt'), valid_role, async (req, res, next) => {
            try {
                let data = req.body
                let response = await productController.createController(data)
                return res.sendSuccessCreate(response)
            } catch (error) {
                next(error)
            }
        });

        this.read('/', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let response = await productController.readController()
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound("product")
                }
            } catch (error) {
                next(error)
            }
        });

        this.read('/:id', passport.authenticate('jwt'), async (req, res, next) => {
            try {
                let { id } = req.params
                let response = await productController.readOneController(id)
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound("product")
                }
            } catch (error) {
                next(error)
            }
        });

        this.update('/:id', passport.authenticate('jwt'), valid_role, async (req, res, next) => {
            try {
                let { id } = req.params;
                let data = req.body;
                let response = await productController.updateController(id, data)
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound("product")
                }
            } catch (error) {
                next(error)
            }
        });

        this.delete('/:id', passport.authenticate('jwt'), valid_role, async (req, res, next) => {
            try {
                let { id } = req.params;
                let response = await productController.deleteController(id);
                if (response) {
                    return res.sendSuccess(response)
                } else {
                    return res.sendNotFound("product")
                }
            } catch (error) {
                next(error)
            }
        });
    }
}