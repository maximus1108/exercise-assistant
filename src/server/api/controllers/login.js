const mongoose = require('mongoose');
const passport = require('passport');

module.exports = (req, res) => {
    passport.authenticate('local', {
        session: false
    }, (err, user) => {
        if (err) {
            res.json({
                message: err && err.message,
                error: true
            })
        } else {
            const token = user.createJwt();

            res.json({
                token
            });
        }
    })(req, res);
}