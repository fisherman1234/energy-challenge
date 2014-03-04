define([
  './base',
  'shared/models/user'
], function (BaseCollection, UserModel) {

  return BaseCollection.extend({
    url: '/api/accounts', // TODO OR NOT TO DO
    model: UserModel
  });

});
