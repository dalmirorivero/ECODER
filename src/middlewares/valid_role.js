import errors from "../config/errors.js";
import CustomError from "../config/CustomError.js";

export default function (req, res, next) {
    try {
        if (req.user.role === 1 || req.user.role === "1") {
            next()
        } else {
            return CustomError.newError(errors.authorization)
        }
    } catch (error) {
        error.where = "role middleware";
        next(error)
    }
};