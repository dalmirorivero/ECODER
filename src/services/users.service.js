import UserRepository from "../repositories/users.rep.js"

export default class UserService {
    constructor() {this.repository = new UserRepository()}

    registerService(data) {
        let response = this.repository.registerRepository(data)
        return response
    };

    loginService(user) {
        let response = this.repository.loginRepository(user)
        return response
    };

    logoutService() {
        let response = this.repository.logoutRepository()
        return response
    };

    readService() {
        let response = this.repository.readUserRepository()
        return response
    };

    readOneService(mail) {
        let response = this.repository.readOneUserRepository(mail)
        return response
    };

    readByIdService(id) {
        let response = this.repository.readByIdRepository(id)
        return response
    };

    updateService(mail, data) {
        let response = this.repository.updateUserRepository(mail, data)
        return response
    };

    deleteService(mail) {
        let response = this.repository.destroyUserRepository(mail)
        return response
    };
};