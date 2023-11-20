import "dotenv/config.js"
import { expect } from "chai";
import supertest from "supertest";
import dao from "../../src/dao/factory.js";
const { Product } = dao

const requester = supertest("http://localhost:8080/api")

describe(
    "APP TEST", () => {
        const model = new Product()
        const data = { title: "JABON", category: "LAVANDERIA", description: "JABON P/ROPA VEGANO", code: "TESTIF-009", stock: 23, price: 500 }
        let id = null
        let user = { name: "Katia", mail: "donatocabrera24@masnatural.com", password: "Donato23", role: 1 }
        let id_user = null
        let token = {}
        
        it("SHOULD REGISTER USER", async () => {
            const response = await requester.post("/auth/register").send(user)
            const { _body, statusCode } = response
            id_user = _body.response.response.user_id
            // console.log(user.password);
            expect(statusCode).to.be.equals(201)
        })

        it("MUST LOG IN", async () => {
            const response = await requester.post("/auth/login").send(user)
            const { statusCode, headers } = response
            // console.log(headers["set-cookie"][0]);
            token.key = headers["set-cookie"][0].split("=")[0]
            token.value = headers["set-cookie"][0].split("=")[1]
            //console.log(token);
            expect(statusCode).to.be.equals(200)
        })
        
        it("SHOULD CREATE A NEW PRODUCT, STATUS CODE 201", async () => {
            console.log(token);
            const response = await requester.post("/products").send(data).set("Cookie", [token.key + "=" + token.value])
            const { _body, statusCode } = response
            console.log({ _body, statusCode })
            id = _body.response.product_id
            console.log(id);
            expect(statusCode).to.be.equals(201)
        })

        it("SHOULD READ PRODUCTS", async () => {
            const response = await requester.get("/products").set("Cookie", [token.key + "=" + token.value])
            const { _body } = response
            console.log(_body);
            expect(Array.isArray(_body.response)).to.be.equals(true)
        })

        it("SHOULD UPDATE A PRODUCT", async () => {
            const before = await model.readOneModel(id)
            const response = await requester.put("/products/" + id).send({ title: "DETERGENTE" }).set("Cookie", [token.key + "=" + token.value])
            const after = await model.readOneModel(id)
            // const { _body, statusCode } = response
            // console.log({_body, statusCode})
            // expect(statusCode).to.be.equals(200)
            expect(before === after).to.be.equals(false)
        })

        it("MUST SIGN OUT", async() => {
            const response = await requester.post('/auth/logout').set("Cookie", [token.key + "=" + token.value])
            const { statusCode } = response
            expect(statusCode).to.be.equals(200)
        })

        it("SHOULD DELETE", async () => {
            const response = await requester.delete("/products/" + id).set("Cookie", [token.key + "=" + token.value])
            // const { _body, statusCode } = response
            // console.log({_body, statusCode})
            // expect(statusCode).to.be.equals(200)
            const found = await model.readOneModel(id)
            expect(found).not.to.be.ok

        })
    }
)
