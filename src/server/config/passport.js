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
                    user.validPassword(password)
                        .then(isValid => isValid ? resolve(user) : reject(new Error('noooooo')))
                )
            )
            .then(user => 
                done(null, user, {
                     message: 'yay'
                    }
                )
            )
            .catch(err => {
                done(err, null, {
                    message: err.message
                })
            })
    }))