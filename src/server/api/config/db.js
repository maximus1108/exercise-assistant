const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('error', (err) => {
    console.log('error connecting to mongodb', err);
})

module.exports = mongoose;