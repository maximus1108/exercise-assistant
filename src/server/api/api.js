const express = require('express');
const app = express();

const env = process.env.NODE_ENV;

//if we are developing
if(env === 'development') {
    //get dummy enviroment variables from .env file
    require('dotenv').config();
    //To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    
        //and remove cacheing so we get the most recent comments
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });
}
else if (env === 'production') {

    const client = path.resolve('../', 'client');

    app.use('/assets/js', express.static(path.resolve(client, 'assets/js')));
    app.use('/assets/css', express.static(path.resolve(client, 'assets/css')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(client, 'index.html'));
    });
}


const bodyParser = require('body-parser');
const apiRouter = require('./routes/index');
const passport = require('passport');
const path = require('path');

require('./config/db');

//GET MODELS FOR MONGOOSE
//register our schema and model for a use with mongoonse
require('./models/User');

//GET CONFIG FOR PASSPORT
require('./config/passport');

var port = process.env.API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', apiRouter);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});