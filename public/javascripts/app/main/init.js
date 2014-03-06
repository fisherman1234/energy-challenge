define([
  'underscore',
  'jquery',
  'backbone',
  './router',
  './layout'
], function (_, $, Backbone, Router, LayoutView) {
  var $body = $('body');

  // hide the navbar for mobiles
  setTimeout(function () {
    if (!_.isMobile()) { return; }
    var height = 1.20 * $(document).height();
    $body.css('min-height', height + 'px');
    window.scrollTo(0, 1);
  }, 20);

  new LayoutView().render();
  var router = new Router($body);
  Backbone.history.start({ pushState: true});


});
