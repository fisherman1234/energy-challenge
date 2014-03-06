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
      this.$el.height(200);
      return this;
    },
    doRender: _.debounce(function () {

      this.$el.dxChart({
        dataSource: this.options,
        commonSeriesSettings: {
          argumentField: "month",
          type: "bar"

        },
        series: [
          { valueField: "grayHours", name: "CO2 Hours", color: "#C9C6B6" },
          { valueField: "greenHours", name: "Green Hours", color: "#779241" }
        ],
        legend: {
          verticalAlignment: "center",
          horizontalAlignment: "center"
        }
      });

    }, 100)

  });


});
