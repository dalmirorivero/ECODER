export default class {
    static newError({message, code, where}) {
        const error = new Error(message)
        error.message = message
        error.statusCode = code || 500
        error.status = `${code}`.startsWith("4") ? "fail" : "error"
        error.where = where
        throw error
    }
}