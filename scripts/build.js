var config = require('../config/webpack.config.prod.js');
var webpack = require('webpack');

webpack(config, function(err, stats) {
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.log(err)
    }
    console.log('built')
    // Done processing
  });
