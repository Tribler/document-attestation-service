const { DefinePlugin, NamedModulesPlugin } = require('webpack');

const base = require('./base.config');

module.exports = base
  .addPlugin(new NamedModulesPlugin())
  .addPlugin(
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      DEBUG: true,
    }),
  )
  .make();
