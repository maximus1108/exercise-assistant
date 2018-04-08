const router = require('express').Router();
const ctrlLogin = require('../controllers/login');
const ctrlRegister = require('../controllers/register')

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.get('/login', ctrlLogin);

router.get('/register', ctrlRegister);

module.exports = router;