import CartService from '../services/carts.service.js'

export default class CartController {
    constructor() {this.service = new CartService()}

    createController(data) {
        let response = this.service.createService(data);
        return response;
      }
      filterController(user_id, state) {
        let response = this.service.filterService(user_id, state);
        return response;
      }
      updateController(id,data) {
        let response = this.service.updateService(id,data);
        return response;
      }
      destroyController(id) {
        let response = this.service.destroyService(id);
        return response;
      }
      readAllController(page) {
        let response = this.service.readAllService(page);
        return response;
      }
      gainController(user_id) {
        let response = this.service.gainService(user_id);
        return response;
      }
};