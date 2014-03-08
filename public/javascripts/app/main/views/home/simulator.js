define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./simulator.html'

], function (Backbone, $, _, BaseView, simulatorTemplate) {

  return BaseView.extend({
    initialize: function (args) {
      this.database = [
        {
          key: "Aquarium",
          value: 500
        },
        {
          key: "Coffee maker",
          value: 200
        },
        {
          key: "Clothes washer",
          value: 500
        },
        {
          key: "Clothes dryer",
          value: 2500
        },
        {
          key: "Dishwasher",
          value: 1250
        },
        {
          key: "Hair dryer",
          value: 150
        },
        {
          key: "Microwave oven",
          value: 200
        },
        {
          key: "Toaster",
          value: 300
        },
        {
          key: "Vacuum cleaner",
          value: 240
        }
      ];
      this.base = 500;
      this.max = 3000;
    },

    render: function () {
      this.$el.html(simulatorTemplate);
      this.createTable();
      this.renderGauge();
      return this;
    },
    events: {
      'click td': 'onCellClicked'
    },
    createTable: function(){
      var $table = $("<table/>");
      var $row = $("<tr/>");
      $table.append($row);
      var curIndex = 0
      _.each(this.database, function(item){
        if (curIndex >= 3){
          $row = $("<tr/>");
          $table.append($row);
          curIndex = 0;
        }
        $cell = $("<td/>");
        $cell.html(item.key);
        $cell.attr('data-value', item.value);
        $row.append($cell);
        curIndex += 1;
      });
      this.$('.controls').append($table);
    },
    onCellClicked: function(e){
      $(e.currentTarget).toggleClass('active');
      this.renderGauge();
    },
    renderGauge: _.debounce(function(){
      var total = 500;
      _.map(this.$('.active'), function(d){
        total += parseInt($(d).attr('data-value'), 10);
      });
      this.graphOptions = {
        0: {color: "g", label: ""},
        1000: {color: "#FFCC00", label: "low"},
        2000: {color: "#FFB300", label: "med."},
        3000: {color: "#FF9900", label: "high"}
      };

      var self = this;

      if (!this.gauge){
        this.gauge = this.$('.gauge').dxLinearGauge({
          rangeContainer: {
            ranges: [
              { startValue: 0, endValue: 1000, color: '#FFCC00' },
              { startValue: 1000, endValue: 2000, color: '#FFB300' },
              { startValue: 2000, endValue: 3000, color: '#FF9900' }
            ]
          },
          scale: {
            startValue: 0,
            endValue: 3000,
            majorTick: {
              tickInterval: 1000
            },
            label: {
              customizeText: function (arg) {
                return self.graphOptions[arg.valueText].label;
              }
            }
          },
          value: total,
          title: {
            text: 'Estimated consumption',
            font: { size: 12 }
          }
        }).dxLinearGauge('instance');
      } else {
        this.gauge.value(total);
      }



    }, 100)

  });


});
