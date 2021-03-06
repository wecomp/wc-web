'use strict';

const istanbul = require('browserify-istanbul');
const isparta = require('isparta');

const karmaBaseConfig = {

  basePath: '../',

  singleRun: true,

  frameworks: ['jasmine', 'browserify'],

  preprocessors: {
    'app/js/**/*.js': ['browserify', 'coverage'],
    'test/**/*.js': ['browserify']
  },

  browsers: ['Firefox'],

  reporters: ['progress', 'coverage'],

  autoWatch: true,

  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', '**/test/**']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // app-specific code
    'app/js/main.js',

    // 3rd-party resources
    'node_modules/angular-mocks/angular-mocks.js',

    // test files
    'test/unit/**/*.js'
  ]

};


module.exports = function (config) {
  config.set(karmaBaseConfig);
};
