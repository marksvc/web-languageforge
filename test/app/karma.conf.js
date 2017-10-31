'use strict';

var webpackConfig = require('../../webpack.config');

// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine', 'karma-typescript'],

    // list of files / patterns to load in the browser
    files: [
      'src/angular-app/**/*.spec.ts'
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/angular-app/**/*.spec.ts': ['webpack'],
      '**/*.ts': ['karma-typescript']
    },

    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json',
      reports: {
        html: 'test/CodeCoverage/typescript/'
      }
    },

    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress', 'karma-typescript'],

    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome', 'PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 8000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
