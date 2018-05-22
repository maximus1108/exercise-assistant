const mongoose = require('mongoose');
const passport = require('passport');

module.exports = //(req, res) => {
    passport.authenticate('jwt', {
        session: false
    }, (err, user) => {
        console.log('done cb', err, user)
    });
//}