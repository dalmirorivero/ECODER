import passport from "passport";
import dao from '../dao/factory.js'
const { User } = dao
import jwt from 'passport-jwt';

const initializePassport = () => {

    passport.use('jwt', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req) => req?.cookies['token']]),
        secretOrKey: process.env.SECRETKEY
    }, async (payload, done) => {
        try {
            const model = new User();
            let user = await model.readOneUserModel(payload.mail)
            if (user) {
                user.response.password = null;

                done(null, user.response)
            } else {
                done(null)
            }
        } catch (error) {
            done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        return done (null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const model = new User()
        const user = await model.readByIdModel(id)
        return done(null, user.response)
    })
};

export default initializePassport;