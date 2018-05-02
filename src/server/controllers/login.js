const mongoose = require('mongoose');

//get register our schema and model for a user with mongoonse
require('../models/User');

module.exports = (req, res) => {
    res.json({ message: 'login'});
}