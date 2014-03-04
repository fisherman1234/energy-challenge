define([
  'jquery'
], function ($) {

  var fns =  {

    isMobile: function() {
      return $(window).width() <= 767;
    },

    isTablet: function() {
      return $(window).width() > 767 && $(window).width() <= 979;
    },

    isDesktop: function() {
      return $(window).width() > 979;
    },

    //String#isBlank Check if the string is "blank" - either null, empty (length of 0) or containing only whitespace.
    isBlank: function (string) {
      return !string || /^\s*$/.test(string);
    },

    ellipsis: function (string, n, ellipsisString) {
      if (!string) {return '';}
      var ellipsis = '&hellip;';
      if (ellipsisString) {
        ellipsis = ellipsisString;
      }

      return string.substr(0, n - 1) + (string.length > n ? ellipsis : '');
    },
    pluralize: function(number, singular, plural){
      if (!plural) {
        plural = this(singular).last() === 'y' ? this(singular).initial() + 'ies' : singular + 's';
      }
      return number + ' ' + (number > 1 ? plural : singular);
    },

    // for a list like ['earth', 'moon', 'mars']
    // return : earth, moon and mars
    enumerate: function(array){
      if (!array || array.length === 0){ return ''; }

      var result = array.slice(0, -1).join(', '); // join the first elements with comma
      var lastItem = array[array.length - 1];

      if (array.length === 1) {
        return result += lastItem;
      }
      result += " and " + lastItem;

      return result;
    },
    isImage: function(filename) {
      if (!filename) { return false; }
      var ext = filename.split('.').pop().toLowerCase();
      var imgExtensions = ['png', 'jpg', 'jpeg', 'gif'];
      return imgExtensions.indexOf(ext) > -1;
    },

    addParameterToURL: function(url, param){
      url += (url.split('?')[1] ? '&' : '?') + param;
      return url;
    },
    pad: function(str, max){
      str = ''+str;  // forces a string conversion
      return str.length < max ? fns.pad("0" + str, max) : str;
    },

    passwordStrength: function(password) {
      // adapted from : http://bassistance.de/jquery-plugins/jquery-plugin-validate.password/
      var LOWER = /[a-z]/,
        UPPER = /[A-Z]/,
        DIGIT = /[0-9]/,
        DIGITS = /[0-9].*[0-9]/,
        SPECIAL = /[^a-zA-Z0-9]/,
        SAME = /^(.)\1+$/,
        minLength = 6;

      function uncapitalize(str) {
        return str.substring(0, 1).toLowerCase() + str.substring(1);
      }

      function rating(rate, message) {
        return {
          rate: rate,
          messageKey: message
        };
      }

      function measure(password) {
        if (!password || password.length < minLength) {
          return rating(0, 'too-short');
        }
        if (SAME.test(password)) {
          return rating(1, 'very-weak');
        }

        var lower = LOWER.test(password),
          upper = UPPER.test(password),
          digit = DIGIT.test(password),
          digits = DIGITS.test(password),
          special = SPECIAL.test(password);

        if (lower && upper && digit) {
          return rating(4, 'strong');
        }
        return rating(2, 'weak');
      }

      return measure(password);
    },

    formatPhoneNumber: function(phonenum) {
      var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;

      //invalid phone number
      if (!regexObj.test(phonenum)) { return phonenum; }

      var parts = phonenum.match(regexObj);
      var phone = '';
      if (parts[1]) {
        phone += '(' + parts[1] + ') ';
      }
      phone += parts[2] + '-' + parts[3];
      return phone;
    },
    setDeepValue: function(el, key, value){ // _.setDeepValue({loop: {id: 12}, 'loop.id', 15) = 15
      key = key.split('.');
      var i = 0, n = key.length;
      for (; i < n - 1; ++i) {
        el = el[key[i]];
      }
      return el[key[i]] = value;
    },
    getDeepValue: function(o, s){ // _.getDeepValue({loop: {id: 12}}, 'loop.id') = 12
      s = s.replace(/^\./, ''); // strip a leading dot
      var a = s.split('.');
      while (a.length){
        var n = a.shift();
        if (n in o){
          o = o[n];
        } else {
          return;
        }
      }
      return o;
    }

  };
  return fns;


});
