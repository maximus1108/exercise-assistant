const mongoose = require('mongoose');

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
        .catch(err => {
            console.log(err);
            res.json({
                message: err && err.message,
                error: true
            })
        })
}