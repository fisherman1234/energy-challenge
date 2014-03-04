define([
  'jquery',
  'underscore',
  'backbone',
  'dx-chart',
  'fastclick',
  'moment',
  'masked-input',
  'sidr',
  'bootstrap',
  'bootstrap-timepicker',
  'datepicker',
  'nouislider',
  'hl-jquery',
  'hl-tooltip',
  'idle-timer',
  'select2',
  'flexigrid',
  'blockui',
  'icheck',
  'validator'
], function() {

  var $ = window.$.noConflict();
  var _ = window._.noConflict();
  var Backbone = window.Backbone.noConflict();

  //noinspection JSHint
  var fastClick = new FastClick(document.body);

  window.Validator.prototype.error = function(msg) { this._errors.push(new Error(msg)); return this; };

});