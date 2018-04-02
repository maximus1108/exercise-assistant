var path = require('path');

//get root.
var root = process.cwd();

module.exports = {
    //loaders
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [
                    path.resolve(root, 'node_modules')
                ],
                use: [{
                    loader: 'babel-loader'
                }]
            }
        ]
    }
};