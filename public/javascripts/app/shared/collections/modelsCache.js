define([
  'jquery',
  'shared/models/home'
], function ($, HomeModel) {

  var modelsCache = {
    home: new HomeModel(),
    currentUser: 'alan'
  };
  return modelsCache;

});
