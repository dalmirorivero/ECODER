import { expect } from "chai";
import dao from "../../src/dao/factory.js";
const { Product } = dao;
const model = new Product();
import { Types } from "mongoose";

const data = { title: "JABON", category: "LAVANDERIA", description: "JABON P/ROPA VEGANO", code: "TEST-001", stock: 23, price: 500 }
let id1 = null;
let id2 = null;
let skip = 1;
let limit = 5

describe("PRODUCTS TEST", () => {
    it("CREATE -  Return must be an object", async () => {
        let response = await model.createModelTest(data)
        console.log(response);
        id1 = response._id

        expect(response).to.be.an("object")
    })
    it("CREATE - Return must contain _id", async () => {
        let response = await model.createModelTest(data)
        id2 = response._id
        console.log(response);
        expect(response._id).to.be.ok
    })
    it("DESTROY - Return must be object", async () => {
        let response = await model.destroyModel(id1)
        expect(response).to.be.an("object")
    })
    it("DESTROY - Verify the object deeltion", async () => {
        await model.destroyModel(id2)
        let found = await model.readOneModel(id2)
        expect(found).not.to.be.ok
    })
    it("UPDATE - Return must be object", async () => {
        let response = await model.updateOneModel(id1, { title: "nono" })
        expect(response).to.be.an("object")
    })
    it("UPDATE - Return must be different object", async () => {
        let before = await model.readOneModel(id2)
        let after = await model.update(id2, { title: "bachicha" })
        expect(before === after).to.be.equals(false)
    })
    it("READ ONE -Required an id", async () => {
        expect(id1).to.be.an.instanceOf(Types.ObjectId)
    })
    it("READ - Response must be array", async () => {
        let response = await model.readModelTest(skip, limit)
        expect(Array.isArray(response)).to.be.equals(true)
    })
})