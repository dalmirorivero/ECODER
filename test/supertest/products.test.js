import "dotenv/config.js"
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";
const { Product } = dao

const requester = supertest("http://localhost:8080/api")

describe(
    "PRODUCT TEST", () => {
        const model = new Product()
        const data = { title: "JABON", category: "LAVANDERIA", description: "JABON P/ROPA VEGANO", code: "TESTID-001", stock: 23, price: 500 }
        let id = null
        it("SHOULD CREATE A NEW PRODUCT, STATUS CODE 201", async() => {
            const response = await requester.post("/products").send(data)
            const { _body, statusCode } = response
            console.log({_body, statusCode})
            id = _body.response.product_id
            console.log(id);
            expect(statusCode).to.be.equals(201)
        })
        it("SHOULD READ PRODUCTS", async()=>{
            const response = await requester.get("/products")
            const {_body} = response
            console.log(_body);
            expect(Array.isArray(_body.response)).to.be.equals(true)
        })
        it("SHOULD UPDATE A PRODUCT", async()=>{
            const before = await model.readOneModel(id)
            const response = await requester.put("/products/"+id).send({ title: "DETERGENTE"})
            const after = await model.readOneModel(id)
            // const { _body, statusCode } = response
            // console.log({_body, statusCode})
            // expect(statusCode).to.be.equals(200)
            expect( before===after ).to.be.equals(false)
        })
        it("SHOULD DELETE", async()=>{
            const response = await requester.delete("/products/"+id)
            // const { _body, statusCode } = response
            // console.log({_body, statusCode})
            // expect(statusCode).to.be.equals(200)
            const found = await model.readOneModel(id)
            expect(found).not.to.be.ok
            
        })
    }
)
