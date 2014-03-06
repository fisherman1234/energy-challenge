define([
  'jquery',
  'underscore',
  'shared/views/base',
  './../graphs/realTimeBreakdown',
  'text!./breakdown.html'

], function ($, _, BaseView, BreakdownView, breakdownTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.breakdown = new BreakdownView();
    },

    render: function () {
      this.$el.html(breakdownTemplate);
      var options = [
        {name: "Solar", value: 1234},
        {name: "Wind", value: 3545},
        {name: "Other renewable", value: 125},
        {name: "Non renewable", value: 5234}
      ];
      this.breakdown.setElement(this.$el).render(options);
      return this;
    }

  });


});
