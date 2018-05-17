const mongoose = require('mongoose');
const passport = require('passport');

module.exports = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err, user, info)
    })(req, res);
}