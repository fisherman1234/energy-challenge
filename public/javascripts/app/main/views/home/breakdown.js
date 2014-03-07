define([
  'jquery',
  'underscore',
  'shared/collections/modelsCache',
  'shared/views/base',
  './../graphs/realTimeBreakdown',
  'text!./breakdown.html'

], function ($, _, modelsCache, BaseView, BreakdownView, breakdownTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.breakdown = new BreakdownView();
    },

    render: function () {
      this.$el.html(breakdownTemplate);
      var options = modelsCache.home.get('real_time_prod').details;
      this.breakdown.setElement(this.$el).render(options);
      return this;
    }

  });


});
