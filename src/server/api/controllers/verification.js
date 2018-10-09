const mailer = require('nodemailer')

const generateHash = length =>  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return new Array(length).fill('').reduce(string => string + characters.charAt(Math.floor(Math.random() * characters.length)), '');
}

const sendVerificationEmail = (email, hash = generateHash(16)) => {
    console.log(email, hash)
}

module.exports = {
    generateHash,
    sendVerificationEmail
}