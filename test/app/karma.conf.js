'use strict';

const webpackConfig = require('../../webpack.config')(process.env);

// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'src/angular-app/**/*.spec.ts', watched: false }
    ],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/angular-app/**/*.spec.ts': ['webpack', 'sourcemap']
    },

    webpack: {
      module: webpackConfig.module,

      // plugins: webpackConfig.plugins,
      resolve: webpackConfig.resolve
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: './test/CodeCoverage/typescript/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
      ]
    },

    // web server port
    port: 8080,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

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
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 8000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
