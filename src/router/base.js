import { Router } from 'express';
import CustomError from '../config/CustomError.js';
import errors from '../config/errors.js';

//const {fail, authentication, authorization, unfound } = errors

export default class BaseRouter {
  constructor() {
    this.router = Router();
    this.init();
  };

  getRouter() {
    return this.router
  };

  init() {}

  applyCb(cbs) {
    return cbs.map((cb) => async (...params) => {
      try {
        await cb.apply(this, params)
      } catch (error) {
        params[1].status(500).send(error)
      }
    });
  };

  responses = async (req, res, next) => {
    try {
      res.sendSuccessCreate = (payload) => res.status(201).json(payload);
      res.sendSuccess = (payload) => res.status(200).json(payload);
      res.sendFailed = () => CustomError.newError(errors.fail);
      res.sendInvalidCred = () => CustomError.newError(errors.credentials);
      res.sendUnauthenticatedError = () => CustomError.newError(errors.authentication);
      res.sendUnauthorizedError = () => CustomError.newError(errors.authorization);
      res.sendNotFound = (payload) => CustomError.newError(errors.notFound(payload));
      return next();
    } catch (err) {
      next(err);
    }
  };

  create(path, ...cbs) { this.router.post(path, this.applyCb(cbs)) }

  read(path, ...cbs) { this.router.get(path, this.applyCb(cbs)) }

  update(path, ...cbs) { this.router.put(path, this.applyCb(cbs)) }

  delete(path, ...cbs) { this.router.delete(path, this.applyCb(cbs)) }

  use(path, ...cbs) { this.router.use(path, this.responses, this.applyCb(cbs)) }
};