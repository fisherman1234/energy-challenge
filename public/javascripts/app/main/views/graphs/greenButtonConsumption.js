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
      this.$el.width(1000);
      this.consumption.fetch();
      return this;
    },
    doRender: function () {

      var $table = $("<table/>");
      $table.addClass('punchard');
      var curDay;
      $row = $('<tr/>');

      for (var i = 0; i < 24; i++){
        var $cell = $("<th/>");
        $cell.html(i);
        $row.append($cell);
      }
      $table.append($row);

      this.consumption.each(function (model) {

        var day = model.get('date');

        if (day !== curDay){
          curDay = day;
          $row = $('<tr/>');
          $table.append($row);
        }
        var $cell = $("<td/>");
        var colorMap = {
          1 : "#ebf1df",
          2 : "#c4d69e",
          3 : "#779241"
        };

        $cell.css('background-color', colorMap[model.get('fraction')]);
        var fontwidth = 5 + (model.get('consumption') - 1) * 6;
        $cell.html('&#9679;');
        $cell.css('font-size', fontwidth + 'px');
        if (model.get('consumption') == 3 && model.get('fraction') == 1){
          $cell.addClass('gray-hour')
        }
        if (model.get('consumption') == 3 && model.get('fraction') == 3){
          $cell.addClass('green-hour')
        }
        $row.append($cell);

      });
      this.$el.append($table);





    }

  });


});
