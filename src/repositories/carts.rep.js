import CartDto from "../dto/carts.dto.js";
import dao from "../dao/factory.js"
const {Cart} = dao

export default class CartsRepository {
    constructor() { this.model = new Cart()}
    createRepository = (data, next) => {
        try {let dataDto = new CartDto(data);
        let response = this.model.createModel(dataDto);
        return response;} catch {
          error.where = 'repository'
          return next(error)
        }
      };
      filterRepositories = (user_id, state) => this.model.filterModels(user_id, state);
      updateRepository = (id, data) => this.model.updateModel(id, data);
      destroyRepository = (id) => this.model.destroyModel(id);
      readAllRepository = (page) => this.model.readAllModel(page);
      gainRepository = (user_id) => this.model.gainModel(user_id);
}