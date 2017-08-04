/* global __dirname */

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'index.js'
    ]
    // vendor: commons.vendor
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {

    rules: [
      {
        test: /(\.jpg|\.jpeg|\.png|\.eot|\.ttf|\.svg|\.woff|\.woff2)$/,
        loader: 'file-loader?name=shinobi-fonts/[name]-[sha1:hash].[ext]'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'fast-sass-loader',
            options: {
              outputStyle: 'expanded',
              includePaths: [ path.resolve(__dirname, './src/styles') ]
            }
          }

        ]
      },
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [ 'env' ],
              plugins: [
                'transform-runtime',
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      }
    ]

  },
  resolve: {
    modules: [ 'app', 'node_modules', 'src' ],
    alias: {}
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.HotModuleReplacementPlugin()
    // new HtmlWebpackPlugin({
    //   title: 'Demo',
    //   template: 'app/index.html',
    //   inject: 'body',
    //   filename: 'index.html'
    // })
  ]
}
