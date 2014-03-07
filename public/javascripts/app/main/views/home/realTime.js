define([
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/currentConsumption',
  './../graphs/currentGreenGauge',
  'text!./realTime.html'

], function ($, _, BaseView, CurrentConsumptionView, CurrentGreenGaugeView,  realTimeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.currentConsumption = new CurrentConsumptionView();
      this.currentProduction = new CurrentGreenGaugeView();
    },

    render: function (options) {
      this.options = options;

      this.$el.html(_.template(realTimeTemplate, this.options.currentConsumptionOptions));
      this.currentConsumption.setElement(this.$("#current-consumption")).render(this.options.currentConsumption);
      this.currentProduction.setElement(this.$("#current-production")).render(this.options.currentGreenProduction);

      return this;
    }

  });


});
