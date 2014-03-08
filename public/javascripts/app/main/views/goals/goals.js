define([
  'jquery',
  'backbone',
  'underscore',
  'shared/views/base',
  'shared/collections/modelsCache',
  './../graphs/scores',
  'text!./goals.html'

], function ($, Backbone, _, BaseView, modelsCache, ScoreView, goalsTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.scores = new ScoreView();
    },

    render: function () {
      this.$el.html(goalsTemplate);

      var scores = [
        modelsCache.home.get('scores')[1],
        modelsCache.home.get('scores')[2],
        modelsCache.home.get('scores')[3],
        modelsCache.home.get('scores')[4],
        modelsCache.home.get('scores')[5],
        modelsCache.home.get('scores')[6]
      ];

      var additionalOptions = [
        {
          width: 1,
          value: modelsCache.home.get('monthly_target').flags,
          color: '#edbd00',
          dashStyle: 'dash'
        },
        {
          width: 1,
          value: modelsCache.home.get('monthly_target').stars,
          color: '#779241',
          dashStyle: 'dash'
        }
      ]

      this.graphOpt = {data: scores, goalsTarget: additionalOptions };

      this.scores.setElement(this.$("#score-history")).render(this.graphOpt);
      window.a = this.scores;
      this.$('.flag-display').html(-modelsCache.home.get('monthly_target').flags);
      this.$('.star-display').html(modelsCache.home.get('monthly_target').stars);
      this.$('#flag-value').val(-modelsCache.home.get('monthly_target').flags);
      this.$('#star-value').val(modelsCache.home.get('monthly_target').stars);

      return this;
    },
    events: {
      'change #flag-value': 'onFlagValueChanged',
      'change #star-value': 'onStarValueChanged',
      'click #save': 'onSave'
    },
    onFlagValueChanged: function(e){
      var val = $(e.currentTarget).val();
      val = parseInt(val, 10);
      this.graphOpt.goalsTarget[0].value = -val ;
      this.scores.render(this.graphOpt);
      this.$('.flag-display').html(val)

    },
    onStarValueChanged: function(e){
      var val = $(e.currentTarget).val();
      val = parseInt(val, 10);
      this.graphOpt.goalsTarget[1].value = val;
      this.scores.render(this.graphOpt);
      this.$('.star-display').html(val);

    },
    onSave: function(){
      modelsCache.home.set("monthly_target", {flags: -parseInt(this.$("#flag-value").val(), 10), stars: parseInt(this.$("#star-value").val())}).save();
      Backbone.history.navigate('/', true);
    }

  });


});
