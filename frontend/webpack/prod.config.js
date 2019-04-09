const { DefinePlugin } = require('webpack');

const CompressionPlugin = require('compression-webpack-plugin');

const base = require('./base.config');

module.exports = base
  .addPlugin(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
    }),
  )
  .addPlugin(
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      DEBUG: false,
    }),
  )
  .make();
