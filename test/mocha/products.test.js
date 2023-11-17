import assert from 'assert';
import dao from '../../src/dao/factory.js';
const { Product } = dao;
const model = new Product();
const data = {title: "JABON", category: "LAVANDERIA"}
let limit = 1;
let skip = 5;
let id = "6548125fffb714afb63665d0";

describe(
    "PRODUCTS TEST",
    ()=> {
        it("CREATE - Title required", async()=>{
            assert.ok(data.title)
        })
        it("CREATE - Category required", async()=>{
            assert.ok(data.category)
        })
        it("CREATE - Title must be string", ()=>{
            assert.strictEqual(typeof data.title, "string")
        })
        it("CREATE - Category must be string", ()=>{
            assert.strictEqual(typeof data.category, "string")
        })
        it("READ - Skiplimit must be number", async()=>{
            assert.strictEqual(typeof limit, "number")
            assert.strictEqual(typeof skip, "number")
        })
        it("READ - Response must be array", async()=>{
            let response = await model.readModelTest(skip, limit)
            console.log(response);
            assert.strictEqual(Array.isArray(response), true)
        })
        it("UPDATE - ID must be string", ()=>{
            assert.strictEqual(typeof id, "string")
        })
        it("UPDATE - Response must be object", async()=>{
            let response = await model.updateModel(id, {category:'Test'})
            assert.strictEqual(typeof response, 'object')
        })
    }
)