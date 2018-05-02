const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true,
        trim: true
    },
    password: {
        required: true,
        type: String,        
    }
    //,
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

UserSchema.pre('save', function(next) {
    UserModel.findOne({ email: this.email }, 'email', (err, user) => {
        if(err) {
            next({ 
                error: err,
                message: 'Error occured when attempting to save user'
            });
        }
        else if(user) {
            next({ 
                error: new Error('User Exists'),
                message:  `An account is already registered with the email address '${this.email}'`
            });
        }
        else {
            next();
        }
    })
});

UserSchema.methods.setPassword = function(plainText) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainText, 12, (err, hash) => {
            if(err) reject(err);
            this.password = hash;
            resolve();
        })
    }) 
}

UserSchema.methods.createJwt = function() {

    let exp = new Date();
    exp.setDate(exp.getDate() + 7);
    exp = parseInt(exp.getTime() / 1000);

    const user = 
        Object.assign(
            {
                exp
            },
            this
        );

    return jwt.sign(user, process.env.SECRET);

}

const UserModel = mongoose.model('User', UserSchema);

