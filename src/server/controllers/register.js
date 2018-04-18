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
        .then(() => {

            // save the user
            User.save((err) => {
                if(err){
                    console.log(err.error)
                } 
                
                //send a message and an indication of
                //whether there was an error to the client
                res.json({ 
                    message: err && err.message || 'Success',
                    error: err ? true : false
                })
            })

        })
        .catch(e => {
            console.log(e)
        })
}