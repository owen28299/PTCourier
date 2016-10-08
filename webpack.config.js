const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        './react-src/index.js'
    ],
    output: {
        filename: './public/js/browser-bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass")
            },
            {
                test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
                loader: "file-loader?name=./public/theme/assets/images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("./public/theme/styles.css")
    ]
};