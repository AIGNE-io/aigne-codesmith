const path = require('path');

module.exports = {
  entry: './lib/main.js',
  target: 'node',
  mode: 'production',
  externals: {
    '@libsql/client': 'commonjs @libsql/client',
    '@libsql/linux-arm-musleabihf': 'commonjs @libsql/linux-arm-musleabihf',
    '@libsql/linux-arm64-musl': 'commonjs @libsql/linux-arm64-musl',
    '@libsql/linux-x64-musl': 'commonjs @libsql/linux-x64-musl',
    '@libsql/darwin-arm64': 'commonjs @libsql/darwin-arm64',
    '@libsql/darwin-x64': 'commonjs @libsql/darwin-x64',
    '@libsql/win32-x64-msvc': 'commonjs @libsql/win32-x64-msvc'
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