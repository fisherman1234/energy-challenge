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
      this.$el.height(300);

      this.settings = {
        "Solar": {color: "#779241"},
        "Wind": {color: "#d3dc5a"},
        "Other Renewable": {color: "#b4d34f"},
        "Non Renewable": {color: "#C9C6B6"}
      };

      return this;

    },
    doRender: _.debounce(function () {
      var self = this;
      this.$el.dxPieChart({
        legend: {
          verticalAlignment: "bottom",
          horizontalAlignment: "center"
        },
        dataSource: this.options,
        series: [
          {
            argumentField: "name",
            valueField: "value"
          }
        ],
        title: "Real time production",
        customizePoint: function(point){
          return {
            color: self.settings[point.argument].color
          };
        },
        margin: {
          left: 0
        }
      });

    }, 100)

  });


});
