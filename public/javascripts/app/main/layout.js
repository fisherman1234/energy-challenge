define([
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./layout.html'
], function ($, _, BaseView, baseLayout) {

  var View = BaseView.extend({
    el: 'body',
    initialize: function() {
    },
    events: {
      'touchmove .scrollable': 'onScrollableTouch'
    },
    render: function () {
      this.$el.html(baseLayout);
      return this;
    },
    onScrollableTouch: function(e) {
      e.stopPropagation();
    }

  });

  return View;

});
