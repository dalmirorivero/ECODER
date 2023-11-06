import { faker } from '@faker-js/faker';
import UserRepository from '../../repositories/users.rep.js';
import CartRepository from '../../repositories/carts.rep.js';
import ProductsRepository from '../../repositories/products.rep.js';

const user = () => {
    let name = faker.person.firstName()
    let mail = faker.internet.email({ provider: 'masnatural.com' })
    let password = "Donato23"
    return { name, mail, password }
};

const product = () => {
    let title = faker.commerce.productName()
    let category = faker.commerce.productAdjective()
    let description = faker.commerce.productDescription()
    let price = faker.commerce.price({ min: 1000, max: 10000, dec: 0 })
    let code = faker.finance.pin({ length: 4 })
    let stock = faker.finance.pin({ length: 2 })
    return { title, category, description, price, code, stock }
};

const cart = () => {
    const states = ["pending", "delivered", "paid"]
    const jj = Math.floor(Math.random() * 3)
    let quantity = faker.commerce.price({ min: 1, max: 100, dec: 0 })
    let state = states[jj]
    return { quantity, state }
};

const fakeData = async () => {
    try {
        const urepository = new UserRepository();
        const prepository = new ProductsRepository();
        const crepository = new CartRepository();
        for (let i = 0; i < 100; i++) {
            const fakeUser = user();
            const dataUser = await urepository.registerRepository(fakeUser);

            const fakeProduct = product();
            const dataProduct = await prepository.createRepository(fakeProduct);
            console.log(fakeProduct.price);
            for (let j = 0; j < 1; j++) {
                const fakeCart = cart();
                fakeCart.user_id = dataUser.response.user_id;
                fakeCart.product_id = dataProduct.response.product_id;
                fakeCart.price = fakeProduct.price
                await crepository.createRepository(fakeCart);
            }
        } console.log('Fake data create done!');
    } catch (error) { 
        console.log(error); 
    }
};

fakeData();