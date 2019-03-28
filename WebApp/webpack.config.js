'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./src/"

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [
        'react-hot-loader/patch',
        path.resolve('src/index.tsx'),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
      },
    output: {  
        filename: '[name].build.js',
        publicPath: 'assets/',
        path: path.resolve(__dirname, bundleFolder)
       
    },
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.tsx?$/,
                loader: 'ts-loader', 
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
      ],
};