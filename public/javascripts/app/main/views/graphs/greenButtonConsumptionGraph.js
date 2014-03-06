define([
  'jquery',
  'underscore',
  'shared/views/base',
  'collections/greenButtonConsumptions'
], function ($, _, BaseView, GreenButtonConsumptionCollection) {

  return BaseView.extend({
    initialize: function (args) {
      this.consumption = new GreenButtonConsumptionCollection();
      this.consumption.on('sync', this.doRender, this);
    },

    render: function (options) {
      this.options = options;
      this.doRender();
      this.$el.width(1000);
      this.consumption.fetch();
      return this;
    },
    doRender: function () {

      window.a = this.consumption;
      var consumptions = this.consumption.models.map(function (model) {
        return model.get('consumption')
      });
      var productions = this.consumption.models.map(function (model) {
        return model.get('fraction')
      });
      var min = _.min(consumptions);
      var max = _.max(consumptions);
      var step = ( max - min ) / 4;

      this.consumption.each(function (model) {
        var consumption = model.get('consumption');
        if (consumption < min + step) {
          return model.set('consumption', 1);
        }
        if (consumption < min + 2 * step) {
          return model.set('consumption', 2);
        }
        if (consumption < min + 2 * step) {
          return model.set('consumption', 3);
        }
        model.set('consumption', 4);
      });

      var min = _.min(productions);
      var max = _.max(productions);
      var step = ( max - min ) / 4;

      this.consumption.each(function (model) {
        var fraction = model.get('fraction');
        if (fraction < min + step) {
          return model.set('fraction', 1);
        }
        if (fraction < min + 2 * step) {
          return model.set('fraction', 2);
        }
        if (fraction < min + 2 * step) {
          return model.set('fraction', 3);
        }
        model.set('fraction', 4);
      });


      this.$el.dxChart({
        dataSource: this.consumption.toJSON(),
        commonSeriesSettings: {
          type: "spline",
          argumentField: "date"
        },
        series: [
          { valueField: "consumption", name: "User", type: "bar", color: "orange" },
          { valueField: "fraction", name: "Green Production %", type: "stepline", color: "green" }
        ],
        argumentAxis: {
          grid: {
            visible: true
          }
        },
        tooltip: {
          enabled: false
        },
        valueAxis: [
          {
            grid: {
              visible: true
            }
          }
        ],
        title: "Consumptions",
        legend: {
          verticalAlignment: "bottom",
          horizontalAlignment: "center"
        },
        commonPaneSettings: {
          border: {
            visible: true,
            right: false
          }
        }
      });

    }

  });


});
