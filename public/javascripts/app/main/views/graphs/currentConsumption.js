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
      this.graphOptions = {
        0: {color: "g", label: ""},
        1: {color: "#FFCC00", label: "low"},
        2: {color: "#FFB300", label: "med."},
        3: {color: "#FF9900", label: "high"}
      };

      return this;
    },
    doRender: _.debounce(function () {
      var self = this;
      this.$el.dxLinearGauge({
        geometry: { orientation: 'vertical' },
        rangeContainer: {
          ranges: [
            { startValue: 0, endValue: 1, color: '#FFCC00' },
            { startValue: 1, endValue: 2, color: '#FFB300' },
            { startValue: 2, endValue: 3, color: '#FF9900' }
          ]
        },
        scale: {
          startValue: 0,
          endValue: 3,
          majorTick: {
            tickInterval: 1
          },
          label: {
            customizeText: function (arg) {
              return self.graphOptions[arg.valueText].label;
            }
          }
        },
        value: self.options.current - 0.5,
        title: {
          text: 'Your consumption',
          font: { size: 12 }
        }
      });

    }, 100)

  });


});
