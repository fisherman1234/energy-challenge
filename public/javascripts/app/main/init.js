define([
  'underscore',
  'jquery',
  'backbone',
  'jstime-zone',
  './router',
  './layout'
], function (_, $, Backbone, jsTZ, Router, LayoutView) {
  var $body = $('body');
  new LayoutView().render();
  var router = new Router($body);

  window.BrowserTZone = window.BrowserTZone || {};
  BrowserTZone.setCookie = $.cookie("browser.timezone", jstz.determine().name(), { expires: 365, path: '/' });


  Backbone.history.start({ pushState: true});


});
