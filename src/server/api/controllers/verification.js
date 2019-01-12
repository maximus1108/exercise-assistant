const mailer = require('nodemailer');
const verificationModel = require('../models/Verification');
const userModel = require('../models/User');

const devHost = process.env.DEV_SERVER || '';
const companyEmail = `${devHost ? 'test' : 'info'}.fitnessassistant@gmail.com`;

const generateHash = length =>  {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return new Array(length)
                .fill('')
                .reduce(string => 
                    string + characters.charAt(Math.floor(Math.random() * characters.length))
                ,'');
}

const sendVerificationEmail = (email, hash = generateHash(16), host) => {
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: companyEmail,
            pass: devHost ? 'fitnesstest1' : process.env.EMAIL_PWORD
        }
    });
    console.log( process.env.EMAIL_PWORD, companyEmail, email );
    transporter
        .sendMail({
            from: `"Fitness Assistant" <${companyEmail}>`,
            to: devHost ? 'test.fitnessassistant@gmail.com' : email,
            subject: 'Fitness Assistant: Email Verification',
            html: `<p>Thanks for registering with Fitness Assistant, please click the link below to confirm your email:</p>
                    <a href="${devHost || host}/verify?id=${hash}">${devHost || host}/verify?id=${hash}</a>
            `
        })
        .then(info => {
            console.log('email sent', info);
        })
        .catch(e => console.warn('error sending email:', e));
}

const verifyUser = (req, res) => {
    const { hash } = req.body;
    verificationModel
        .findOne({ hash })
        .then(verification => {
            const { userId } = verification;
            if(userId)
                return Promise.all([
                    userModel.findByIdAndUpdate(userId, { active: true }),
                    verification.remove()
                ]);
            else
                throw new Error('No user Id found');
        })
        .then(([user])=> {
            if(user) {
                res.json({
                    error: false
                });
            }
            else {
                res.json({
                    message: `User not found / Invalid user: ${user}`,
                    error: true
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.json({
                message: err && err.message,
                error: true
            });
        })

}

module.exports = {
    generateHash,
    sendVerificationEmail,
    verifyUser
}