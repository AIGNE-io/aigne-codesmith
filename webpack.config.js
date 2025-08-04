const path = require('path');

module.exports = {
  entry: './lib/main.js',
  target: 'node',
  mode: 'production',
  externals: {
  },
  resolve: {
    extensions: ['.js', '.ts'],
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  }
};
