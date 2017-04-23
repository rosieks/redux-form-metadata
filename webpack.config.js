var DeclarationBundlerPlugin = require('declaration-bundler-webpack-plugin'),
    path = require('path');


module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'redux-form-metadata.min.js',
    library: 'redux-form-metadata',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /.tsx?$/, loader: 'ts-loader' }
    ]
  }
}