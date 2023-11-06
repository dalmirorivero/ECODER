import arg from '../config/arguments.js'
import MongoConnect from '../config/mongo.js'
import config from '../config/config.js'

let dao = {}

switch (arg.persistence) {
    case "MEMORY":
        console.log("memory: connected");
        const { default: ProductMemory } = await import ("../dao/memory/products.memory.js")
        const { default: CartMemory } = await import ("../dao/memory/carts.memory.js")
        const { default: UserMemory} = await import ("../dao/memory/auth.memory.js")
        dao = { Product: ProductMemory, Cart: CartMemory, User: UserMemory }
        break
    case "FS":
        console.log("fs: connected");
        const { default: ProductFs } = await import ("../dao/filesystem/products.fs.js") 
        const { default: CartFs } = await import ("../dao/filesystem/carts.fs.js") 
        const { default: UserFs } = await import ("../dao/filesystem/auth.fs.js") 
        dao = { Product: ProductFs, Cart: CartFs, User: UserFs}
        break
    default: //"MONGO"
        const mongo = new MongoConnect(config.DBURI)
        mongo.connect_mongo()
        const { default: ProductMongo } = await import ("../dao/mongo/products.mongo.js")
        const { default: CartMongo } = await import ("../dao/mongo/carts.mongo.js")
        const { default: UserMongo } = await import ("../dao/mongo/auth.mongo.js")
        dao = { Product: ProductMongo, Cart: CartMongo, User: UserMongo}
    break
}

export default dao