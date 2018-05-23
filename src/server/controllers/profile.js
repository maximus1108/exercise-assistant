const mongoose = require('mongoose');
const passport = require('passport');

module.exports = (req, res) => {

    passport.authenticate('jwt', {
        session: false
    }, (err, user) => {
        console.log('okk',err, user)
        if(err){
            res.json({
                error: true,
                message: err.message
            })
        }
        else if(user) {
            res.json({
                message: 'Success!!!!'
            });
        }
        else {
            res.json({
                error: true,
                message: 'Not signed in / invalid token'
            });
        }
    })(req, res);
    // console.log('done cb', err, user)
};