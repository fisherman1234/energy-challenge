define([
  'jquery',
  'underscore',
  'shared/views/base',
  'dx-chart',
  'text!./home.html'

], function ($, _, BaseView, DxChart, homeTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(homeTemplate);
      this.showGraphs();
      return this;
    },
    showGraphs: _.debounce(function(){
      this.$("#chartContainer").dxBarGauge({
        startValue: 0,
        endValue: 100,
        values: [47.27, 65.32, 84.59, 71.86],
        label: {
          indent: 30,
          format: 'fixedPoint',
          precision: 1,
          customizeText: function (arg) {
            return arg.valueText + ' %';
          }
        },
        title: {
          text: "Series' Ratings",
          font: {
            size: 28
          }
        }
      });
    }, 100)

  });


});
