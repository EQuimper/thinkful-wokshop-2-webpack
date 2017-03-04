const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDORS_LIBS = [
  'react', 'react-dom', 'axios'
];

module.exports = {
  devtool: 'inline-source-map',
  target: 'web',
  entry: {
    bundle: [
      'babel-polyfill',
      // 'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      // 'webpack/hot/only-dev-server',
      './src/index.js'
    ],
    vendor: VENDORS_LIBS
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  devServer: {
    port: 9000,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    // hot: true,
    stats: 'minimal',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: ['css-loader']
        }),
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('styles.css')
  ]
};
