// CAPA DE PERSISTENCIA 1

import fs from 'fs';

export default class User {
    constructor() {
        this.users = [];
        this.path = "./src/dao/filesystem/files/users.json";
        this.init();
    }
    init() {
        let file = fs.existsSync(this.path);
        if (!file) {
            fs.writeFileSync(this.path, "[]");
        } else {
            this.users = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
        }
        return true;
    }
    async registerModel(data) {
        this.users.push(data);
        let data_json = JSON.stringify(this.users, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        return {
            message: "user registered!",
            response: {user_id: data._id} 
        };
    }
    loginModel(user) {
        return {
            message: "user logged in!",
            response: true,
        };
    }
    logoutModel() {
        return {
            message: "user signed out!",
            response: null,
        };
    }
    readUserModel() {
        let all = this.users;
        all.map((each) => delete each.password);
        if (all.length > 0) {
            return {
                message: "users found!",
                response: { users: all },
            };
        } else {
            return null;
        }
    }
    readOneUserModel(mail) {
        let one = this.users.find((each) => each.mail === mail);
        if (one) {
            return {
                message: "user found!",
                response: one,
            };
        } else {
            return null;
        }
    }
    readByIdModel(id) {
        let one = this.users.find((each) => each._id === id);
        if (one) {
            return {
                message: "user found!",
                response: one,
            };
        } else {
            return null;
        }
    }
    async updateUserModel(mail, data) {
        try {
            let one = this.users.find((each) => each.mail === mail);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                let data_json = JSON.stringify(this.users, null, 2);
                await fs.promises.writeFile(this.path, data_json);
                return {
                    message: "user updated!",
                    response: one,
                };
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    }
    async destroyUserModel(mail) {
        try {
            let one = this.users.find((each) => each.mail === mail);
            if (one) {
                this.users = this.users.filter((each) => each.mail !== mail);
                let data_json = JSON.stringify(this.users, null, 2);
                await fs.promises.writeFile(this.path, data_json);
                return {
                    message: "user destroyed!",
                    response: one,
                };
            } else {
                return null;
            }
        } catch (error) {
            return false;
        }
    }
}