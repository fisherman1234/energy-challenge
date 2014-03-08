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

      this.colorMap = {
        1: "#d3dc5a",
        2: "#b4d34f",
        3: "#779241"
      };
      this.doRender();
      return this;
    },
    doRender: function () {
      this.$el.empty();
      var $table = $("<table/>");
      $table.addClass('forecast');
      var $row1 = $("<tr/>");
      var $row2 = $("<tr/>");
      var self = this;

      _.each(this.options, function(opt){
        var $cell1 = $("<td/>");
        $cell1.html(opt.hour);
        $row1.append($cell1);
        var $cell2 = $("<td/>");
        $cell2.css('background-color', self.colorMap[opt.forecast]);
        $row2.append($cell2);
      });
      $table.append($row1);
      $table.append($row2);
      this.$el.append($table);
    }

  });


});
