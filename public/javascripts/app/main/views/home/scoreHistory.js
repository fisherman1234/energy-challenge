define([
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./scoreHistory.html'

], function ($, _, BaseView, scoreHistoryTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(scoreHistoryTemplate);
      return this;
    }

  });


});
