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
      var consumptions = this.consumption.models.map(function(model){return model.get('consumption')});
      var productions = this.consumption.models.map(function (model) { return model.get('fraction') });
      var min = _.min(consumptions);
      var max = _.max(consumptions);
      var step = ( max - min ) / 4;

      this.consumption.each(function(model){
        var consumption = model.get('consumption');
        if (consumption < min + step) {return model.set('consumption', 1);}
        if (consumption < min + 3 * step) { return model.set('consumption', 2); }
        model.set('consumption', 3);
      });

      var min = _.min(productions);
      var max = _.max(productions);
      var step = ( max - min ) / 4;

      this.consumption.each(function (model) {
        var fraction = model.get('fraction');
        if (fraction < min + step) {
          return model.set('fraction', 1);
        }
        if (fraction < min + 3 * step) {
          return model.set('fraction', 2);
        }
        model.set('fraction', 3);
      });


      var $table = $("<table/>");
      var curDay;
      var $row;
      this.consumption.each(function (model) {

        var day = moment(model.get('date')).add('hours', 7).dayOfYear();

        if (day !== curDay){
          curDay = day;
          $row = $('<tr/>');
          $table.append($row);
        }
        var $cell = $("<td/>");
        var colorMap = {
          1 : "#ebf1df",
          2 : "#c4d69e",
          3 : "#779241",
          4 : "#779241"
        };

        $cell.css('background-color', colorMap[model.get('fraction')]);
        var fontwidth = 5 + (model.get('consumption') - 1) * 6;
        $cell.css('width', '20px');
        $cell.css('height', '20px');
        $cell.css('text-align', 'center');
        $cell.html('o');
        $cell.css('font-size', fontwidth + 'px');
        if (model.get('consumption') == 3 && model.get('fraction') == 1){
          $cell.css('color', 'orange');
        }
        $row.append($cell);

      });
      this.$el.append($table);





    }

  });


});
