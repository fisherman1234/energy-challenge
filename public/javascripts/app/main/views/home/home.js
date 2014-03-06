define([
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/forecast',
  './realTime',
  './../graphs/currentGreenGauge',
  'text!./home.html'

], function ($, _, BaseView, ForecastView, RealTimeView, CurrentGreenGaugeView, homeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.forecast = new ForecastView();
      this.realTime = new RealTimeView();
      this.currentGreenGauge = new CurrentGreenGaugeView();
    },

    render: function () {
      this.$el.html(homeTemplate);

      var realTimeOptions = {
        currentConsumptionOptions: {baseConsumption: 13, currentConsumption: 23, peakConsumption: 34},
        currentGreenGauge: {value: 1}
      };

      this.forecast.setElement(this.$("#forecast")).render();
      this.realTime.setElement(this.$("#real-time")).render(realTimeOptions);
      this.currentGreenGauge.setElement(this.$("#current-green-gauge")).render(realTimeOptions.currentGreenGauge);

      return this;
    }

  });


});
