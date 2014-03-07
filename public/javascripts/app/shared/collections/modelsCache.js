define([
  'jquery',
  'shared/models/home'
], function ($, HomeModel) {

  var modelsCache = {
    home: new HomeModel()
  };
  return modelsCache;

});
