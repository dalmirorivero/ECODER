import dao from '../dao/factory.js'
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
        return res.status(401).json({
          status: 401,
          method: req.method,
          path: req.url,
          response: 'invalid user'
      })}
    } catch (error) {
      return next(error);
    }
  }