import crypto from "crypto"
import args from "../config/arguments.js"

export default class CartDto{
    constructor(obj){
        this.product_id = obj.product_id
        this.user_id = obj.user_id
        this.price = obj.price
        obj.state ? (this.state = obj.state) : (this.state = "pending");
        obj.quantity ? (this.quantity = obj.quantity) : (this.quantity = 1);
        if (args.persistence === "FS" || args.persistence === "MEMORY") {
        this._id = crypto.randomBytes(12).toString("hex");
    }
    }
}