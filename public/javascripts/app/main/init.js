define([
  'underscore',
  'jquery',
  'backbone',
  'jstime-zone',
  './router',
  'shared/collections/modelsCache',
  './layout'
], function (_, $, Backbone, jsTZ, Router, modelsCache, LayoutView) {
  var $body = $('body');
  new LayoutView().render();
  var router = new Router($body);
  window.modelsCache = modelsCache;

  window.BrowserTZone = window.BrowserTZone || {};
  BrowserTZone.setCookie = $.cookie("browser.timezone", jstz.determine().name(), { expires: 365, path: '/' });


  Backbone.history.start({ pushState: true});


});
