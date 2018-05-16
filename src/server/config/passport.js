const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// const PassportJwt = require('passport-jwt');
// const JwtStrategy = PassportJwt.Strategy;
// const ExtractJwt = PassportJwt.ExtractJwt;

const User = require('mongoose').model('User');

passport.use(new LocalStrategy({
        usernameField: 'email'       
    }, (email, password, done) => {
        console.log('local', email, password)
        User.findOne({ email })
            .then(user => user.validPassword(password))
            .then(passwordValid => {
                console.log('password ...', passwordValid)
                if(passwordValid)
                    return user;
                    
                throw new Error('noooooo');
            })
            .then(user => 
                done(null, user, {
                     message: 'yay'
                    }
                )
            )
            .catch(err => {
                console.log('in error', err, err.message)
                done(err, null, {
                    message: err.message
                })
            })
    }))