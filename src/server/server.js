const express = require('express');
const app = express();

const env = process.env.DEV_NODE_ENV || process.env.NODE_ENV;

//if we are developing
if(env === 'development') {
    //To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    
        //and remove cacheing so we get the most recent comments
        res.setHeader('Cache-Control', 'no-cache');
        next();
    });
}
else if (env === 'production') {
    const path = require('path');
    
    const client = path.resolve('build', 'client');

    app.use('/assets/js', express.static(path.resolve(client, 'assets/js')));
    app.use('/assets/css', express.static(path.resolve(client, 'assets/css')));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(client, 'index.html'));
    });
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const apiRouter = require('./api');
const passport = require('passport');

require('./api/config/db');

//GET MODELS FOR MONGOOSE
//register our schema and model for a use with mongoonse
require('./api/models/User');

//GET CONFIG FOR PASSPORT
require('./api/config/passport');

const port = process.env.DEV_PORT || process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', apiRouter);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});