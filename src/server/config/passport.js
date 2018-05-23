const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
    Strategy: JwtStrategy,
    ExtractJwt
} = require('passport-jwt');

const User = require('mongoose').model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'       
}, (email, password, done) => {
    User.findOne({ email })
        .then(user =>  
            new Promise((resolve, reject) =>
                user 
                    ? user.validPassword(password)
                            .then(isValid => isValid ? resolve(user) : reject(new Error('Invalid password')))
                    : reject(new Error('User does not exist'))
            )
        )
        .then(user => 
            done(null, user)
        )
        .catch(err => {
            console.log(err)
            done(err, null)
        })
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}, (payload, done) => {
    console.log(payload._id)
    User.findById(payload._id)
        .then(user => console.log(user, 'FOUND'))
        .catch(e => console.log(e))
}));