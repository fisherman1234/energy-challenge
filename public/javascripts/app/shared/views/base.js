define([
  'backbone'
], function (Backbone) {

  return Backbone.View.extend({

    getQueryParams: function () {
      var pairs = window.location.search.substring(1).split("&");
      var obj = {};
      for (var i in pairs) {
        if (pairs[i] === "") {
          continue;
        }

        var pair = pairs[i].split("=");
        obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return obj;
    },
    clean: function () {
      // override this function if needed
      this.remove();
      this.unbind();
    }
  });

});