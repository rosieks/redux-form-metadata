var path = require('path');
var nodeExternals = require('webpack-node-externals');

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
        rules: [
            { 
                test: /.tsx?$/, 
                exclude: /(node_modules)/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: '#inline-cheap-module-source-map'
};