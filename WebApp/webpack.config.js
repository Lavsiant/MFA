'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./src/"

module.exports = {
    entry: [
        srcFolder + "index.tsx"
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: "inline-source-map",
    output: {  
        filename: "bundle.js",
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
        new CleanWebpackPlugin([bundleFolder])
    ]
};