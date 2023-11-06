import { compareSync } from 'bcrypt';
import dao from '../dao/factory.js'
const { User } = dao


export default async function (req, res, next) {
    try{
    let passwordForm = req.body.password
    let model = new User();
    let user = await model.readOneUserModel(req.body.mail)

    let passwordHash = user.response.password
    if (passwordHash) {
        let verified = compareSync(passwordForm, passwordHash);
        if (verified) {
            return next();
        }
    }
    return res.sendInvalidCred()
} catch(error) {
    next(error)
}
}