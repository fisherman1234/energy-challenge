define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./navigation.html'

], function (Backbone, $, _, BaseView, navigationTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function (options) {
      this.$el.html(_.template(navigationTemplate, options));
      if (options.hideBack){
        this.$('.previous-page').hide();
      }
      return this;
    },
    events: {
      'click .previous-page': 'onPreviousPageClick'
    },
    onPreviousPageClick: function(){
      Backbone.history.navigate('/', true);
    }

  });


});
