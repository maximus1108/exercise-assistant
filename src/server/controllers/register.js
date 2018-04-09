var mongoose = require('mongoose');

module.exports = function(req, res) {

    

    res.json({ message: `registering email: ${req.body.email}` });
}