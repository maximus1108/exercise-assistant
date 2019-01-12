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
                    ? user.active 
                        ? user.validPassword(password)
                              .then(isValid => isValid ? resolve(user) : reject(new Error('Incorrect password.')))
                        : reject(new Error('Account not activated, please check your emails.'))
                    : reject(new Error('User does not exist with that email address.'))
            )
        )
        .then(user => 
            done(null, user)
        )
        .catch(err => {
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