define([
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./home.html'

], function ($, _, BaseView, homeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(homeTemplate);
      return this;
    }

  });


});
