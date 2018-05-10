const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// const PassportJwt = require('passport-jwt');
// const JwtStrategy = PassportJwt.Strategy;
// const ExtractJwt = PassportJwt.ExtractJwt;

const User = require('mongoose').model('User');

passport.use(new LocalStrategy({
        usernameField: 'email'       
    }, function(email, password, done) {
        console.log('local', email, password)
        User.findOne({ email })
            .then(user => {
               const rand = Math.round(Math.random());
               console.log(rand)
               if(rand)
                return user;

                throw Error('noooo');
            })
            .then(user => 
                done(null, user, {
                     message: 'yay'
                    }
                )
            )
            .catch(err => {
                console.log(err, err.message)
                done(err, null, {
                    message: err.message
                })
            })
    }))