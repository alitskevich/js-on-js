var webpackConfig = require('./webpack.config')

module.exports = function (config) {

  config.set({
    basePath: '',
    browsers: [],
    frameworks: [ 'jasmine' ],
    reporters: [],
    files: [ 'src/**/*.test.js' ],
    preprocessors: {
      'src/**/*.test.js': [ 'webpack' ]
    },
    webpackPreprocessor: {
      configPath: './webpack.config.js'
    },
    webpack: webpackConfig,
    webpackServer: {},
    client: {
      captureConsole: true
    },
    autoWatch: true,
    singleRun: false,
    logLevel: config.LOG_INFO
  });
}