const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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

const UserModel = mongoose.model('User', UserSchema);

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
