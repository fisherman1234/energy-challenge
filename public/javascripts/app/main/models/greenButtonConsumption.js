define([
  'backbone'
], function (Backbone) {

  return Backbone.Model.extend({
    urlRoot: '/api/green_button',
    parse: function(data){
      data.consumption = parseFloat(data.consumption);
      data.fraction = 100*parseFloat(data.fraction);

      return data;
    }

  });

});
