define([
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/currentConsumption',
  'text!./realTime.html'

], function ($, _, BaseView, CurrentConsumptionView, realTimeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.currentConsumption = new CurrentConsumptionView();
    },

    render: function (options) {
      this.options = options;

      this.$el.html(_.template(realTimeTemplate, this.options.currentConsumptionOptions));
      this.currentConsumption.setElement(this.$("#current-consumption")).render(this.options.currentConsumptionOptions);

      return this;
    }

  });


});
