define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./login.html'

], function (Backbone, $, _, BaseView, loginTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(loginTemplate);
      return this;
    },
    events: {
      'click .login': 'openHome'
    },
    openHome: function(){
      Backbone.history.navigate('/home', true);
    }

  });


});
