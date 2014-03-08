define([
  'backbone',
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./page1.html',
  'text!./page2.html',
  'text!./page3.html',
  'text!./page4.html',
  'text!./page5.html',
  'text!./tutorials.html'
], function (Backbone, $, _, BaseView, page1Template, page2Template, page3Template, page4Template, page5Template, tutorialTemplate) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(tutorialTemplate);
      this.slidCount = 0;
      this.$("#page1").html(page1Template);
      this.$("#page2").html(page2Template);
      this.$("#page3").html(page3Template);
      this.$("#page4").html(page4Template);
      this.$("#page5").html(page5Template);

      return this;
    },
    events: {
      'click .btn': 'openApp',
      'slid': 'onSlid'
    },
    openApp: function(){
      Backbone.history.navigate('/home', true);
    },
    onSlid: function(e){
      this.slidCount += 1;
      if (this.slidCount == 4){
        this.$(".carousel-control").hide();
      }
    }

  });


});
