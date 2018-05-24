require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./api/routes/index');
const app = express();
const passport = require('passport');


require('./api/config/db');

//GET MODELS FOR MONGOOSE
//register our schema and model for a use with mongoonse
require('./api/models/User');

//GET CONFIG FOR PASSPORT
require('./api/config/passport')


var port = process.env.API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

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
  
app.use('/api', apiRouter);

app.listen(port, function() {
    console.log(`api running on port ${port}`);
});