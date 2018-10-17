const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String,
        unique: true
    },
    hash: {
        required: true,
        type: String,        
    }
});

const VerificationModel = mongoose.model('Verification', VerificationSchema);

module.exports = VerificationModel;