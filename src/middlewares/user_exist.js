import dao from '../dao/factory.js'
import CustomError from '../config/CustomError.js';
import errors from '../config/errors.js';

const { User } = dao;

export default async function (req, res, next) {
    try {
      const model = new User()
      const { mail } = req.body;
      let one = await model.readOneUserModel(mail);
      if (one) {
        req.user = one.response;
        return next();
      } else {
        return CustomError.newError(errors.credentials)}
    } catch (error) {
      error.where = "user exist middleware"
      return next(error);
    }
  }