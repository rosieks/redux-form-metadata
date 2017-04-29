var path = require('path');
var nodeExternals = require('webpack-node-externals');

const coverage = process.env.NODE_ENV === 'coverage';

module.exports = {
    resolve: {
        modules: [path.resolve('./src'), 'node_modules'],
        extensions: ['.ts', '.js']
    },
    output: {
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [].concat
            (coverage ? {
                test: /\.(j|t)sx?$/,
                include: path.resolve('src'),
                loader: 'istanbul-instrumenter-loader'
            } : [],
            { 
                test: /\.tsx?$/, 
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            }
        )        
    },
    devtool: '#inline-cheap-module-source-map'
};