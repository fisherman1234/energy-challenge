define([
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/greenButtonConsumption',
  'text!./history.html'

], function ($, _, BaseView, GreenButtonConsumptionView, historyViewTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.consumption = new GreenButtonConsumptionView();
    },

    render: function () {
      this.$el.html(historyViewTemplate);
      this.consumption.setElement(this.$("#full-history")).render();
      return this;
    }

  });


});
