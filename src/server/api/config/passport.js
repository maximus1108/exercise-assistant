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

const extractFromCookie = req => {
    var token = null;
    if (req && req.cookies){
        token = req.cookies['jwt'];
    }
    return token;
}

passport.use(new JwtStrategy({
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: extractFromCookie,
    secretOrKey: process.env.SECRET
}, (payload, done) => {
    User.findById(payload._id)
        .then(user => {
            console.log('in then')
            if(!user)
                throw new Error('User not found')
            // console.log(user)
            done(null, user)
        })
        .catch(err => {
            console.log('in errr')
            done(err)
        });
}));