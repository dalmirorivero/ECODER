import ProductsRepository from "../repositories/products.rep.js"

export default class ProductService {
    constructor() {this.repository = new ProductsRepository()}

    createService(data) {
        let response = this.repository.createRepository(data)
        return response
    };

    readService() {
        let response = this.repository.readRepository()
        return response
    };

    readOneService(id) {
        let response = this.repository.readOneRepository(id)
        return response
    };

    updateService(id, data) {
        let response = this.repository.updateRepository(id, data)
        return response
    };

    deleteService(id) {
        let response = this.repository.destroyRepository(id)
        return response
    };
};