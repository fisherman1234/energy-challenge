define([
  'underscore',
  'jquery',
  'backbone',
  './router',
  './layout'
], function (_, $, Backbone, Router, LayoutView) {
  var $body = $('body');
  new LayoutView().render();
  var router = new Router($body);
  Backbone.history.start({ pushState: true});


});
