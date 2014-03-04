define([
], function() {

  return {
    set: function(name, value, days) {
      var expires = '';
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
      }
      document.cookie = name + '=' + value + expires + '; path=/';
    },

    get: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    },

    delete: function(name) {
      this.set(name, '', -1);
    },

    deleteAll: function(){
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var equals = cookies[i].indexOf('=');
        var name = equals > -1 ? cookies[i].substr(0, equals) : cookies[i];
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
    }
  };

});
