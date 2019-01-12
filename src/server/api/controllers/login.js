const mongoose = require('mongoose');
const passport = require('passport');

const prod = (process.env.DEV_NODE_ENV || process.env.NODE_ENV) === 'production';

module.exports = (req, res) => {
    passport.authenticate('local', {
        session: false
    }, (err, user) => {
        if (err || !user) {
            res.json({
                message: err && err.message,
                error: true
            })
        } else {
            const jwt = user.createJwt();
            res.cookie('jwt', jwt, { 
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                secure: prod
            })
            .json({
                error: false
            })
        }
    })(req, res);
}