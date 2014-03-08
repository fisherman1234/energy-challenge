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
      this.$('.loading').css('display', 'table');
      this.$('.content').hide();
      modelsCache.home.set({id: modelsCache.currentUser});
      modelsCache.home.fetch();
      return this;
    },
    doRender: function(){
      this.$('.loading').hide();
      this.$('.content').show();
      var realTimeOptions = {
        currentConsumption: modelsCache.home.get('real_time_consumption'),
        currentGreenProduction: modelsCache.home.get('real_time_prod')
      };

      var feedbacks = {
        'c3p1': '<i class="icon-warning-sign"></i> CO2 hour !',
        'c3p2': "You're on track :-) !",
        'c3p3': "<i class='icon-certificate'></i> Good job ! You're earning a Green Hour point",
        'c2p1': "<i class='icon-warning - sign'></i> CO2 hour !",
        'c2p2': "You're on track :-) !",
        'c2p3': "You're on track :-) !",
        'c1p1': "All good !",
        'c1p2': "Time to earn a Green Hour point !",
        'c1p3': "Time to earn a Green Hour point !"
      }

      var scores = [
        modelsCache.home.get('scores')[0],
        modelsCache.home.get('scores')[1],
        modelsCache.home.get('scores')[2],
        modelsCache.home.get('scores')[3],
        modelsCache.home.get('scores')[4],
        modelsCache.home.get('scores')[5]
      ];
      var graphData = {data: scores};

      var feedbackKey = "c" + realTimeOptions.currentConsumption.current + "p" + realTimeOptions.currentGreenProduction.current;

      var starStat = modelsCache.home.get('scores')[0].stars / modelsCache.home.get('monthly_target').stars;
      this.$(".bar-green-hour").css('width', Math.min(100 * starStat, 100) + '%');
      var flagStat = modelsCache.home.get('scores')[0].flags / modelsCache.home.get('monthly_target').flags;
      this.$(".bar-gray-hour").css('width', Math.min(100 * flagStat, 100) + '%');

      this.$("#real-time-tip").html(feedbacks[feedbackKey]);
      this.forecast.setElement(this.$("#forecast")).render(modelsCache.home.get('forecast'));
      this.realTime.setElement(this.$("#real-time")).render(realTimeOptions);
      //this.currentGreenGauge.setElement(this.$("#current-green-gauge")).render(realTimeOptions.currentGreenGauge);
      this.scores.setElement(this.$("#scores")).render(graphData);

    },
    onSectionClicked: function(e){
      var target = $(e.currentTarget).attr('data-target');
      if (target){
        Backbone.history.navigate(target, true)
      }
    }

  });


});
