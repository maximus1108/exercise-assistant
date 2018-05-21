const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// const PassportJwt = require('passport-jwt');
// const JwtStrategy = PassportJwt.Strategy;
// const ExtractJwt = PassportJwt.ExtractJwt;

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
    }))