export default function (req, res, next) {
    try {
        if (req.user.role === 1 || req.user.role === "1") {
            next()
        } else {
            return res.status(403).json({
                status: 403,
                method: req.method,
                path: req.url,
                response: 'No posee los permisos'
            })
        }
    } catch (error) {
        next(error)
    }
};