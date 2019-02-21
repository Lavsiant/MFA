'use strict';

const webpack = require('webpack');
const path = require('path');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./src/"

module.exports = {
    entry: [
        srcFolder + "index"
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    devtool: "inline-source-map",
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
};