import UserService from "../services/users.service.js";

const service = new UserService();

const authController = {
    registerController: async (req, res, next) => {
        try {
            let data = req.body;
            let response = await service.registerService(data)
            if (response) {
                return res
                    .status(201)
                    .json({
                        message: 'User created.',
                        response: response
                    })
            }
        } catch (error) {
            error.where = " auth controller "
            next(error)
        }
    },

    loginController: async (req, res, next) => {
        try {
            let user = req.user;
            console.log(user);
            req.session.mail = req.body.mail;
            req.session.role = req.user.role;
            let response = await service.loginService(user)
            if (response) {
                return res
                    .cookie('token', req.session.token, {
                        maxAge: 60 * 60 * 24 * 7 * 1000
                    })
                    .sendSuccess(response)
            } else {
                return res.sendNotFound('user');
            }
        } catch (error) {
            error.where = " auth controller "
            next(error)
        }
    },

    logoutController: async (req, res, next) => {
        try {
            req.session.destroy()
            let response = await service.logoutService()
            if (response) {
                return res
                .status(200)
                .clearCookie('token')
                .json({
                    message: 'User logout',
                    response: response
                })
            } else {
                return res
                .clearCookie('token')
                .sendNotFound('user')
            }
        } catch (error) {
            error.where = " auth controller "
            next(error)
        }
    },

    readController: async (req, res, next) => {
        try {
            let response = await service.readService()
            if (response) {
                return res.sendSuccess(response)
            } else {
                return res.sendNotFound('users')
            }
        } catch (error) {
            error.where = " auth controller "
            next(error)
        }
    },

    readOneController(mail) {
        let response = this.service.readOneService(mail)
        return response
    },

    readByIdController(id) {
        let response = this.service.readByIdService(id)
        return response
    },

    updateController(mail, data) {
        let response = this.service.updateService(mail, data)
        return response
    },

    deleteController(mail) {
        let response = this.service.deleteService(mail)
        return response
    }
};

export default authController;