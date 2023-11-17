import dao from '../dao/factory.js'
import CustomError from '../config/CustomError.js';
import errors from '../config/errors.js';

const { User } = dao;

export default async function (req, res, next){
    try {
        const model = new User()
        const {mail} = req.body
        let one = await model.readOneUserModel(mail)
        if (!one){
            next ()
        } else{
            return CustomError.newError(errors.authentication)
        }
    } catch (error) {
        error.where = "valid user middleware"
        next(error)
    }
};