var webpack = require('webpack');
module.exports = {
    entry: './react-src/index.js',
    output: {
        filename: './public/js/browser-bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};