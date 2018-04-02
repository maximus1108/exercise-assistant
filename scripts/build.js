var config = require('../config/webpack.config.prod.js');
var webpack = require('webpack');

webpack(config, function(err, stats) {
    if (err || stats.hasErrors()) {
      // Handle errors
      return console.log(err, stats.compilation.errors)
    }
    
    // Done processing
    console.log('built');
  });
