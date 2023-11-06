import ProductDto from "../dto/products.dto.js"
import dao from "../dao/factory.js"
const { Product } = dao

export default class ProductsRepository {
    constructor() {
        this.model = new Product()
        }

        createRepository(data) {
            data = new ProductDto (data)
            let response = this.model.createModel(data)
            return response
        }

        readRepository(){
            let response = this.model.readModel()
            return response
        }

        readOneRepository(id){
            let response = this.model.readOneModel(id)
            return response
        }

        updateRepository(id, data){
            let response = this.model.updateModel(id, data)
            return response
        }

        destroyRepository(id){
            let response = this.model.destroyModel(id)
            return response
        }
    }
