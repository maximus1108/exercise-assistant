const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    salt: String,
    hash: String
});

mongoose.model('User', User);