// CAPA DE PERSISTENCIA 1

import User from '../../models/user.js';

export default class AuthMongo {
    constructor() { }

    async registerModel(data, next) {
        try {
            let one = await User.create(data)
            return {
                message: 'User created broki.',
                response: { user_id: one._id }
            }
        } catch (error) {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async loginModel(user, next) {
        try {
            return {
                message: 'User logged in.',
                response: { user }
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async logoutModel(next) {
        try {
            return {
                message: 'User logged out.',
                response: true
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async readUserModel(next) {
        try {
            let all = await User.find({}, "-password")
            if (all.length > 0) {
                return {
                    message: 'Users found.',
                    response: { users: all }
                }
            } else {
                return null;
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async readOneUserModel(mail, next) {
        try {
            let one = await User.findOne({ mail })
            if (one) {
                return {
                    message: 'User found.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async readByIdModel(id, next) {
        try {
            let one = await User.findById(id)
            if (one) {
                return {
                    message: 'User found.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async updateUserModel(mail, data, next) {
        try {
            let one = await User.findOneAndUpdate({ mail }, data, { new: true })
            if (one) {
                return {
                    message: 'User updated.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    };

    async destroyUserModel(mail, next) {
        try {
            let one = await User.findOneAndDelete({ mail })
            if (one) {
                return {
                    message: 'User deleted.',
                    response: one
                }
            } else {
                return null;
            }
        } catch {
            error.where = "auth persistence mongo"
            return next(error)
        }
    }
};