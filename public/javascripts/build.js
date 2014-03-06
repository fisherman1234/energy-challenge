var async = require('async');
var requirejs = require('requirejs');
var fs = require('fs');
var _ = require('underscore');
var exec = require('child_process').exec;

var baseWebBuildDir = __dirname + '/web-build';

var baseConfig = {
  appDir: __dirname + '/app',
  dir: baseWebBuildDir,
  keepBuildDir: true,
  optimize: 'uglify',
  preserveLicenseComments: false,
  modules: [
    { name: 'main', exclude: ['../common'] },
    { name: '../common' },
    { name: 'init', exclude: ['../common', 'main'] }
  ]
};

var sharedConfig = JSON.parse(fs.readFileSync('app/main/mainConfig.json', 'utf8'));

var configClinic = _.extend({baseUrl: 'main'}, sharedConfig, baseConfig);

requirejs.optimize(configClinic, function (buildResponse) {
  console.log(buildResponse);
  done();
}, function (error) {
  console.log(error);
});