define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  'shared/collections/modelsCache',
  './../graphs/forecast',
  './realTime',
  './../graphs/currentGreenGauge',
  './../graphs/scores',
  'text!./home.html'

], function (Backbone, $, _, BaseView, modelsCache, ForecastView, RealTimeView, CurrentGreenGaugeView, ScoreView, homeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.forecast = new ForecastView();
      this.realTime = new RealTimeView();
      this.currentGreenGauge = new CurrentGreenGaugeView();
      this.scores = new ScoreView();
      modelsCache.home.on('sync', this.doRender, this);
    },

    events: {
      'click .section': 'onSectionClicked'
    },
    render: function () {
      this.$el.html(homeTemplate);
      modelsCache.home.set({id: 1});
      modelsCache.home.fetch();
      return this;
    },
    doRender: function(){
      var realTimeOptions = {
        currentConsumption: modelsCache.home.get('real_time_consumption'),
        currentGreenProduction: modelsCache.home.get('real_time_prod')
      };
      var scores = [
        modelsCache.home.get('scores')[0],
        modelsCache.home.get('scores')[1],
        modelsCache.home.get('scores')[2],
        modelsCache.home.get('scores')[3],
        modelsCache.home.get('scores')[4],
        modelsCache.home.get('scores')[5]
      ];

      var starStat = modelsCache.home.get('scores')[0].stars / modelsCache.home.get('monthly_target').stars;
      this.$(".bar-green-hour").width(100 * starStat);
      var flagStat = modelsCache.home.get('scores')[0].flags / modelsCache.home.get('monthly_target').flags;
      this.$(".bar-gray-hour").width(100 * flagStat);

      var tips = {
        1: '<i class="icon-tint"></i> Try to offset part of your energy consumption to later.',
        3: '<i class="icon-certificate"></i> Time to earn a Green Hour point !'
      };

      this.$("#real-time-tip").html(tips[realTimeOptions.currentConsumption.value]);
      this.forecast.setElement(this.$("#forecast")).render();
      this.realTime.setElement(this.$("#real-time")).render(realTimeOptions);
      //this.currentGreenGauge.setElement(this.$("#current-green-gauge")).render(realTimeOptions.currentGreenGauge);
      this.scores.setElement(this.$("#scores")).render(scores);

    },
    onSectionClicked: function(e){
      var target = $(e.currentTarget).attr('data-target');
      if (target){
        Backbone.history.navigate(target, true)
      }
    }

  });


});
