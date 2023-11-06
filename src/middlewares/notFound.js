import logger from "../config/logger.js";

const not_found_handler = (req, res, next) => {
  req.logger = logger
  req.logger.ERROR(`${req.method} ${req.url} - ${new Date().toLocaleTimeString()} - ruta inexistente`)
  return res.status(404).json({
    method: req.method,
    path: req.url,
    message: "not found",
  });
}

export default not_found_handler