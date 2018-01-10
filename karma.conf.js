// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
  config.set({
    DEFAULT_TIMEOUT_INTERVAL: 10000,
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    files: [
      { pattern: './node_modules/jquery/dist/jquery.min.js', watched: false },
      { pattern: './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js', watched: false }
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      'report-config': {

        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml','coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
