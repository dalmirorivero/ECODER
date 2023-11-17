import logger from "../config/logger.js";

const error_handler = (error, req, res, next) => {
  let where = error.where || "error handler";
  req.logger = logger
  if (`${error.statusCode}`.startsWith("4")) {
    req.logger.ERROR(`${req.method} ${req.url} ${where} - ${new Date().toLocaleTimeString()} - ${error.message}`)
  }
  else {
    req.logger.FATAL(
      `${req.method} ${req.url} ${where} - ${new Date().toLocaleTimeString()} - ${error.message
      }`
    );
  }
  return res.status(error.statusCode).json({
    method: req.method,
    path: req.url,
    message: error.message,
  });
};

export default error_handler;