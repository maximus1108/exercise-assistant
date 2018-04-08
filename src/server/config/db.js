const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin1@ds141068.mlab.com:41068/fitness-assistant');

mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongodb', err);
})

module.exports = mongoose;