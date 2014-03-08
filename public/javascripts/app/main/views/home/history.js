define([
  'jquery',
  'underscore',
  'shared/collections/modelsCache',
  'shared/views/base',
  './../graphs/greenButtonConsumption',
  'text!./history.html',
  'text!./goalData.html'

], function ($, _, modelsCache, BaseView, GreenButtonConsumptionView, historyViewTemplate, goalDataTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.consumption = new GreenButtonConsumptionView();
      this.consumption.on('rendered', this.postRender, this);
    },

    render: function () {
      this.$el.html(historyViewTemplate);
      this.$('.legend').hide();
      var options = {};
      options.data = {last_day: moment().dayOfYear(), duration: 6};
      this.consumption.setElement(this.$("#full-history")).render(options);
      return this;
    },
    postRender: function(){
      this.$('.legend').show();
      var data = {
        stars: this.consumption.scores.stars.length,
        starsTotal: modelsCache.home.get('monthly_target').stars,
        flags: this.consumption.scores.flags.length,
        flagsTotal: -modelsCache.home.get('monthly_target').flags
      }
      this.$("#goal-data").html(_.template(goalDataTemplate, data));
    }

  });


});
