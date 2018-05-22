const router = require('express').Router();
const ctrlLogin = require('../controllers/login');
const ctrlRegister = require('../controllers/register');
const ctrlProfile = require('../controllers/profile');

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.post('/login', ctrlLogin);

router.post('/register', ctrlRegister);

router.get('/profile', ctrlProfile, (a,b) => console.log(a,b));

module.exports = router;