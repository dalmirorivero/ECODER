// CAPA DE PERSISTENCIA 1

import fs from 'fs';

export default class Product {
    constructor() {
        this.products = []
        this.path = "./src/dao/filesystem/files/products.json"
        this.init();
    }

    init() {
        let file = fs.existsSync(this.path);
        if (!file) {
            fs.writeFileSync(this.path, "[]");
        } else {
            this.products = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
        }
        return true;
    }

    async createModel(data) {

        this.products.push(data)
        let datajson = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.path, datajson)
        return {
            message: 'Product created.',
            response: { product_id: data._id }
        }
    }

    readModel() {
        let all = this.products
        if (this.products.length > 0) {
            return {
                message: 'Products found.',
                response: { products: all }
            }
        } else {
            return null

        }
    }

    readOneModel(id) {
        let one = this.products.find((each) => each._id == id)
        if (one) {
            return {
                message: "Product found.",
                response: one
            }
        } else {
            return null
        }
    }

    async updateModel(id, data) {
        try {
            let one = this.products.find((each) => each._id == id)
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop]
                }
                let datajson = JSON.stringify(this.products, null, 2)
                await fs.promises.writeFile(this.path, datajson)
                return {
                    message: "Produc updated.",
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
            let one = this.products.find((each) => each._id == id)
            if (one) {
                this.products = this.products.filter((each) => each._id !== id)
                let datajson = JSON.stringify(this.products, null, 2)
                await fs.promises.writeFile(this.path, datajson)
                return {
                    message: 'Toy deleted.',
                    response: one
                }
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}