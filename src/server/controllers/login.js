const mongoose = require('mongoose');
const passport = require('passport');

//get register our schema and model for a user with mongoonse
// require('../models/User');

module.exports = (req, res) => {
    console.log('logging', req.body.email, req.body.password)
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('auth cb', err, user, info)
    
    })(req, res);
}