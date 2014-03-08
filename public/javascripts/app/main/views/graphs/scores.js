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
      var base = {
        dataSource: this.options.data,
        commonSeriesSettings: {
          argumentField: "month",
          type: "bar"

        },
        series: [
          { valueField: "flags", name: "CO2 Hours", color: "#edbd00" },
          { valueField: "stars", name: "Green Hours", color: "#779241" }
        ],
        legend: {
          verticalAlignment: "center",
          horizontalAlignment: "center"
        }
      };

      var flagData = _.pluck(this.options.data, "flags");
      var starData = _.pluck(this.options.data, "stars");

      if (this.options.goalsTarget){
        var additionalOptions = {valueAxis: { constantLines: this.options.goalsTarget }};
        base = _.extend(base, additionalOptions);
        flagData.push(this.options.goalsTarget[0].value);
        starData.push(this.options.goalsTarget[1].value + 20);
      }
      base.valueAxis = base.valueAxis || {};

      base.valueAxis.min = _.min(flagData) - 10;
      base.valueAxis.max = _.max(starData) + 10;

      this.chart = this.$el.dxChart(base);



    }, 100)

  });


});
