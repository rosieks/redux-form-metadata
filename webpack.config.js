module.exports = {
  entry: './src/index.ts',
  output: {
    filename: './dist/redux-form-metadata.min.js'
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