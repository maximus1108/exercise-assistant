const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    }//,
    // firstName: {
    //     type: String,
    //     required: true
    // },
    // surname: {
    //     type: String,
    //     required: true
    // },
    // salt: String,
    // hash: String
});

const UserModel = mongoose.model('User', User);

User.pre('save', (next) => {
    User.findOne({ email: email }, (err, user) => {
        if(err)
            next(err);
        else if(user){
            next(new Error('User Exisits'))
        }
        else
            next();
    })
});
