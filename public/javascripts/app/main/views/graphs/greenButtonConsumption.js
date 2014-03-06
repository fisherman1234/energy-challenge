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
      this.consumption.fetch();
      return this;
    },
    doRender: function () {

      var $table = $("<table/>");
      $table.addClass('punchard');
      var curDay;
      $row = $('<tr/>');
      var curDayOffset = 0;
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
          var $cell = $("<td class='rowhead' colspan='24'/>");
          $cell.html(moment().add('days', curDayOffset).format('MMM, ddd DD'));
          $row.append($cell);
          $table.append($row);

          $row = $('<tr/>');
          $table.append($row);
          curDayOffset -= 1;
        }


        var $cell = $("<td/>");

        if (curDayOffset === -1 && model.get('hour') >= moment().hour()) {
          return $row.append($cell); // we do not display post hours
        }

        var colorMap = {
          1 : "rgba(211, 220, 90, 0.2)",
          2 : "rgba(180, 211, 79, 0.53)",
          3 : "rgba(119, 146, 65, 0.7)"
        };

        $cell.css('background-color', colorMap[model.get('fraction')]);
        var fontwidth = 5 + (model.get('consumption') - 1) * 6;
        $cell.html('&#9679;');
        $cell.css('font-size', fontwidth + 'px');
        if (model.get('consumption') == 3 && model.get('fraction') == 1){
          $cell.html('<i class="icon-flag"/>');
          $cell.addClass('gray-hour');
          $cell.css('font-size', 10 + 'px');

        }
        if (model.get('consumption') == 3 && model.get('fraction') == 3){
          $cell.html('<i class="icon-star"/>');
          $cell.addClass('green-hour');
          $cell.css('font-size', 10 + 'px');

        }
        $row.append($cell);

      });
      this.$el.append($table);





    }

  });


});
