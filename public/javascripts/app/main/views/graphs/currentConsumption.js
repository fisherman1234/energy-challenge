define([
  'jquery',
  'underscore',
  'shared/views/base'
], function ($, _, BaseView) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function (options) {
      this.options = options;
      this.doRender();
      this.$el.height(100);
      return this;
    },
    doRender: _.debounce(function () {
      this.$el.dxCircularGauge({
        geometry: {
          startAngle: 180, endAngle: 0
        },
        rangeContainer: {
          ranges: [
            {
              startValue: 0,
              endValue: this.options.baseConsumption,
              color: '#b4d34f'
            },
            {
              startValue: this.options.baseConsumption,
              endValue: this.options.peakConsumption,
              color: '#d3dc5a'
            },
            {
              startValue: this.options.peakConsumption,
              endValue: 1.2 * Math.max(this.options.peakConsumption, this.options.currentConsumption),
              color: '#f1e064'
            }
          ]
        },
        scale: {
          startValue: 0, endValue: 1.2 * Math.max(this.options.peakConsumption, this.options.currentConsumption),
          majorTick: {
            showCalculatedTicks: false,
            customTickValues: [0, this.options.baseConsumption, this.options.peakConsumption]
          }
        },
        value: this.options.currentConsumption
      });

    }, 100)

  });


});
