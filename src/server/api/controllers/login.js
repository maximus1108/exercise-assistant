const mongoose = require('mongoose');
const passport = require('passport');

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
            res.cookie('jwt', jwt, { httpOnly: true }).json({ error: false })
        }
    })(req, res);
}