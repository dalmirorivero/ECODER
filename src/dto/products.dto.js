import crypto from "crypto"
import args from "../config/arguments.js"

export default class ProductDto {
    constructor(obj) {
        this.title = obj.title
        this.category = obj.category
        this.description = obj.description
        this.code = obj.code
        this.price = obj.price
        this.stock = obj.stock
        if (args.persistence === "FS" || args.persistence === "MEMORY") {
            this._id = crypto.randomBytes(13).toString("hex")
        }
    }
}