const webpack = require('webpack');
const path = require('path');

const config = {
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, '../../force-app/main/default/staticresources/trader_desktop'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
module.exports = config;