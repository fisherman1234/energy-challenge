define([
  'jquery',
  'underscore',
  'shared/collections/modelsCache',
  'shared/views/base',
  'collections/greenButtonConsumptions'
], function ($, _, modelsCache, BaseView, GreenButtonConsumptionCollection) {

  return BaseView.extend({
    initialize: function (args) {
      this.consumption = new GreenButtonConsumptionCollection();
      this.consumption.on('sync', this.doRender, this);
    },

    render: function (options) {
      this.options = options || {};
      this.options.data = this.options.data || {last_day: moment().dayOfYear(), duration: 6};
      this.options.data.user_id = modelsCache.currentUser;
      this.consumption.fetch({data: this.options.data});
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
      var self = this;
      this.scores = {stars: [], flags: []};

      this.consumption.each(function (model) {

        var day = model.get('date');

        if (moment(day).dayOfYear() > moment().dayOfYear()){
          return;
        }

        if (day !== curDay){
          if (curDayOffset < -6) {
            return;
          }
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

        if (moment(day).dayOfYear() === moment().dayOfYear() && model.get('hour') >= moment().hour()) {
          return $row.append($cell); // we do not display future hours
        }



        var colorMap = {
          1 : "rgba(211, 220, 90, 0.2)",
          2 : "rgba(180, 211, 79, 0.53)",
          3 : "rgba(119, 146, 65, 0.7)"
        };

        $cell.css('background-color', colorMap[model.get('fraction')]);
        var fontwidth = 5 + (model.get('consumption') - 1) * 6;
        //$cell.html('&#9679;');
        $cell.css('font-size', fontwidth + 'px');
        if (model.get('consumption') == 3 && model.get('fraction') == 1){
          $cell.html('<i class="icon-flag"/>');
          $cell.addClass('gray-hour');
          $cell.css('font-size', 10 + 'px');
          self.scores.flags.push(model);

        }
        if (model.get('consumption') == 3 && (model.get('fraction') == 3 || model.get('fraction') == 2)){
          $cell.html('<i class="icon-star"/>');
          $cell.addClass('green-hour');
          $cell.css('font-size', 10 + 'px');
          self.scores.stars.push(model);

        }
        $row.append($cell);

      });
      this.$el.append($table);
      this.trigger('rendered');




    }

  });


});
