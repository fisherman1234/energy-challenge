define([
  'underscore',
  'backbone',
  'models/greenButtonConsumption'
], function (_, Backbone, GreenButtonConsumptionModel) {

  var Collection = Backbone.Collection.extend({
    model: GreenButtonConsumptionModel,
    url: '/api/green_button'

  });

  return Collection;

});
