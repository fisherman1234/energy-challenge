define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/forecast',
  './realTime',
  './../graphs/currentGreenGauge',
  './../graphs/scores',
  'text!./home.html'

], function (Backbone, $, _, BaseView, ForecastView, RealTimeView, CurrentGreenGaugeView, ScoreView, homeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.forecast = new ForecastView();
      this.realTime = new RealTimeView();
      this.currentGreenGauge = new CurrentGreenGaugeView();
      this.scores = new ScoreView();
    },

    events: {
      'click .section': 'onSectionClicked'
    },
    render: function () {
      this.$el.html(homeTemplate);

      var realTimeOptions = {
        currentConsumptionOptions: {baseConsumption: 13, currentConsumption: 23, peakConsumption: 34},
        currentGreenGauge: {value: 1}
      };

      var scores = [
        {month: "Oct", greenHours: 165, grayHours: -24},
        {month: "Nov", greenHours: 35, grayHours: -34},
        {month: "Dec", greenHours: 234, grayHours: -54},
        {month: "Jan", greenHours: 195, grayHours: -12},
        {month: "Fev", greenHours: 134, grayHours: -14},
        {month: "Mars", greenHours: 10, grayHours: -5}
      ];

      this.forecast.setElement(this.$("#forecast")).render();
      this.realTime.setElement(this.$("#real-time")).render(realTimeOptions);
      this.currentGreenGauge.setElement(this.$("#current-green-gauge")).render(realTimeOptions.currentGreenGauge);
      this.scores.setElement(this.$("#scores")).render(scores);

      return this;
    },
    onSectionClicked: function(e){
      var target = $(e.currentTarget).attr('data-target');
      if (target){
        Backbone.history.navigate(target, true)
      }
    }

  });


});
