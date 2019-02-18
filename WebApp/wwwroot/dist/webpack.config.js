'use strict';
const webpack = require('webpack');
const path = require('path');
const bundleFolder = "./wwwroot/assets/";
const srcFolder = "./src/";
module.exports = {
    entry: [
        srcFolder + "index.tsx"
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: "source-map",
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
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
        ]
    },
    plugins: []
};
//# sourceMappingURL=webpack.config.js.map