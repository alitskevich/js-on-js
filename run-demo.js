/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
// var bodyParser = require('body-parser');
var config = require('./webpack.config.js');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/app',
  hot: true,
  stats: {
    colors: true,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: true
  }
});

// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use('*', useIndexHtmlFactory(compiler));

server.listen(8080, '0.0.0.0', function () {
  console.log('Demo is available at', server.listeningApp._connectionKey);
});
