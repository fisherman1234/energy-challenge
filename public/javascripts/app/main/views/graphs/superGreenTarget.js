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
      this.$el.height(40);
      return this;
    },
    doRender: _.debounce(function () {

      this.$el.dxLinearGauge({
        scale: {
          startValue: 0,
          endValue: this.options.target,
          majorTick: {
            tickInterval: 2.5
          }
        },
        value: this.options.current,
        subvalues: [27, 45],
        subvalueIndicator: {
          type: 'textcloud',
          color: '#779ECB'
        }
      });

    }, 100)

  });


});
