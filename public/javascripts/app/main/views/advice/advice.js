define([
  'jquery',
  'underscore',
  'shared/views/base',
  'text!./advice.html',
  'text!./tip1.html',
  'text!./tip2.html',
  'text!./tip3.html',
  'text!./tip4.html',
  'text!./tip5.html',
  'text!./tip6.html'

], function ($, _, BaseView, adviceTemplate, page1Template, page2Template, page3Template, page4Template, page5Template, page6Template) {

  return BaseView.extend({
    initialize: function (args) {
    },

    render: function () {
      this.$el.html(adviceTemplate);
      this.$("#page1").html(page1Template);
      this.$("#page2").html(page2Template);
      this.$("#page3").html(page3Template);
      this.$("#page4").html(page4Template);
      this.$("#page5").html(page5Template);
      this.$("#page6").html(page6Template);

      return this;
    }

  });


});
