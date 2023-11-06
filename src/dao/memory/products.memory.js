// CAPA DE PERSISTENCIA 1

export default class Product {
    static products = []

    init() {}

        async createModel(data) {
            Product.products.push(data)
            return {
                message: "Product created",
                response: {product_id: data._id}
            }
        }

        readModel() {
            let all = Product.products
            if (Product.products.length > 0){
                return {
                    message: "Products found",
                    response: { products: all}
                }
            } else {
                return {
                    response: null,
                    message: "Products not found"
                }
            }
        }

        readOneModel(id) {
            let one = Product.products.find((each) => each._id === id)
            if (one) {
                return {
                    message: "Toy found!",
                    response: one
                }
            } else {
                return {
                    response: null,
                    message: "Products not found"
                }
            }
        }

        async updateModel(id, data) {
            try {
                let one = Product.products.find((each) => each._id === id)
                if (one) {
                    for (let prop in data) {
                        one[prop] = data[prop]
                    
                } return {
                    message: "Toy updated",
                    response: one
                }
            } else {
                return null
            }
            } catch (error) {
                console.log(error);
                return false
            }
        }

        async destroyModel(id) {
            try {
                let one = Product.products.find((each) => each._id === id)
                if (one)  {
                    Product.products = Product.products.filter((each) => each._id !== id)
                    return {
                        message: "Product deleted",
                        response: one 
                    }
                } else {
                    return null
                }
            } catch (error) {
                console.log(error);
                return false
            }
        }
    
}