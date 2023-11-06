import UserDto from "../dto/users.dto.js";
import dao from "../dao/factory.js"
const { User } = dao

export default class UserRepository {
    constructor() {
      this.model = new User();
    }
    registerRepository = (data) => {
      let dataDto = new UserDto(data);
      let response = this.model.registerModel(dataDto);
      return response;
    };
    loginRepository = (user) => this.model.loginModel(user);
    logoutRepository = () => this.model.logoutModel();
    readUserRepository = () => this.model.readUserModel();
    readOneUserRepository = (mail) => this.model.readOneUserModel(mail);
    updateUserRepository = (mail, data) => this.model.updateUserModel(mail, data)
    readByIdRepository = (id) => this.model.readByIdModel(id)
    destroyUserRepository = (mail) => this.model.destroyUserModel(mail);
  }