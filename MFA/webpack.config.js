'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./App/"

module.exports = {
    entry: {
        app: ['./App/index.jsx', 'webpack-hot-middleware/client'],
        vendor: ['react', 'react-dom']
    },    
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js',
        publicPath:path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
        ]
    },
   
};


// const path = require('path'),
//     webpack = require('webpack'),
//     HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//     entry: {
//         app: ['./src/app/App.tsx', 'webpack-hot-middleware/client'],
//         vendor: ['react', 'react-dom']
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'js/[name].bundle.js'
//     },
//     devtool: 'source-map',
//     resolve: {
//         extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.(ts|tsx)$/,
//                 loader: 'ts-loader'
//             },
//             { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'app', 'index.html') }),
//         new webpack.HotModuleReplacementPlugin()
//     ]
// }