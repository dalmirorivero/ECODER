import __dirname from "../utils.js"

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-CODER",
            description: "Documentation of API"
        }
    },
    apis: [`${__dirname}/./docs/*.yaml`]
};

export default swaggerOptions; 