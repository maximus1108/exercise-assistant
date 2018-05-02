const mongoose = require('mongoose');

//get register our schema and model for a user with mongoonse
require('../models/User');

module.exports = (req, res) => {

    //get model for user from mongoose
    const userModel = mongoose.model('User');

    //create new instance of user model
    const User = new userModel();

    //store the email sent in the request on the user
    User.email = req.body.email;

    User.setPassword(req.body.password)
        .then(_ => User.save())
        .then(_ => {

            const token = User.createJwt();

            res.json({
                token
            })
        })
        .catch(e => {
            console.log(e);
            res.json({
                message: e && e.message,
                error: true
            })
        })
}