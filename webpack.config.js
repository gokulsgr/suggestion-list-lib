const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        library: ['SuggestionList'],
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                }, {
                    loader: 'postcss-loader',
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                        data: '@import "variables";\n@import "mixins";\n',
                        includePaths: [
                            path.join(__dirname, 'src'),
                        ],
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    plugins: [],
    watch: true,
    watchOptions: {
        ignored: ['dist', 'node_modules', 'gulp'],
    },
};
