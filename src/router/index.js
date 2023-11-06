import BaseRouter from './base.js';
import AuthRouter from './api/auth.router.js';
import ProductRouter from './api/products.router.js';
import CartRouter from './api/carts.router.js';
import transport from '../config/transport.js';
import config from '../config/config.js';
import __dirname from '../utils.js'

const auth = new AuthRouter();
const cart = new CartRouter();
const product = new ProductRouter();

export default class IndexRouter extends BaseRouter {
    init() {
        this.read('/', (req, res) => res.status(200).send('eCODER'));
        this.use('/auth', auth.getRouter());
        this.use('/products', product.getRouter());
        this.use('/carts', cart.getRouter());
        ///////////////////////////////////////////////////////////////
        this.create('/mail', async (req, res, next) => {
            try {
                let to = req.body.to
                let subject = "hola amor :)"
                let html = (product) => `
                <h1>NODEMAIL TEST</h1>
                <p>1... 2... 3... </p>
                <img src="cid:nono">
                ${product.title} - ${product.price}`

                await transport.sendMail({
                    from: config.GMAIL,
                    to,
                    subject,
                    html: html({ title: "Deterente Solido 90gr", price: "$1500" }),
                    attachments: [{
                        filename:'nono.png', path: `${__dirname}/public/nono.png`, cid: 'nono'
                    }]
                })
                let response = {response: 'sent'}
                return res.status(200).json(response)
                } catch (error) {
                next(error)
            }
        })
        ///////////////////////////////////////////////////////////////////////////
        this.read('/simple', (req, res) => {
            let total = 1;
            for (let i = 1; i < 100; i++) {
              total = i * i;
            }
            return res.status(200).send({ total });
          });
          this.read('/complex', (req, res) => {
            let total = 1;
            for (let i = 1; i < 1000000000; i++) {
              total = i * i;
            }
            return res.status(200).send({ total });
          });
    }
};