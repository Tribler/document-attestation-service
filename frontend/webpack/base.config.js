const { boilerpack } = require('boilerpack');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = boilerpack({
  devServer: {
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
    },
    historyApiFallback: {
      index: '/index.html',
    },
    host: '0.0.0.0',
    disableHostCheck: true,
    compress: true,
    noInfo: true,
    contentBase: resolve(__dirname, '../dist'),
  },
  devtool: 'source-maps',
})
  .addEntry('main', ['./src/Main', 'preact'])
  .addExtensions('.ts', '.tsx', '.scss')
  .addRule('typescript', {
    test: /\.(tsx|ts)$/,
    use: 'awesome-typescript-loader',
  })
  .addRule('sass', {
    test: /\.scss?$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  })
  .addPlugin(
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  )
  .withOutput({
    publicPath: '/',
    filename: '[hash].bundle.js',
    chunkFilename: '[chunkhash].chunk.js',
    path: resolve(__dirname, '../dist'),
  });
