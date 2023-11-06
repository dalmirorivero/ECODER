import crypto from "crypto"; 
import args from "../config/arguments.js"; 
import { hashSync, genSaltSync } from "bcrypt";

export default class UserDto {
  constructor(obj) {
    this.name = obj.name;
    this.mail = obj.mail;
    this.age = obj.age
    this.password = hashSync(obj.password, genSaltSync(10));
    this.photo = obj.photo;
    obj.role ? (this.role = obj.role) : (this.role = 0);
    if (args.persistence === "FS" || args.persistence === "MEMORY") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.__v = 0;
      this._id = crypto.randomBytes(12).toString("hex");
    }
  }
}
