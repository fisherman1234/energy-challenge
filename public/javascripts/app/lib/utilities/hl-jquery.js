define([
  'jquery'
], function ($) {

  $.fn.isOnScreen = function () {
    var win = $(window);

    var viewport = {
      top: win.scrollTop(),
      left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
  };

  $.fn.scrollToShow = function(options){
    if ($(window).width() <= 767) { // is mobile
      $(document).scrollTop(this.position().top - 120);
    } else {
      var $target = this.closest('.scrollable');
      if ($target.length === 0){ return; }
      var self = this;
      var delta = this.offset().top - $target.offset().top - 120;
      if (options && options.animate){
        $target.animate({
          scrollTop: delta
        }, 300);
      } else {
        $target.scrollTop(delta);
      }
    }
  };

  $.fn.bindToFileUpload = function (fileUpload) {
    var self = this;
    fileUpload.on('change', function () {
      if (!this.files || !this.files[0]) {
        return;
      }
      var reader = new FileReader();

      reader.onload = function (e) {
        self.attr('src', e.target.result);
        self.css('height', self.width());
        self.css('width', self.width());
      };
      reader.readAsDataURL(this.files[0]);
    });
  };

  $.fn.removeControlGroupIndicators = function () {
    var controlGroupClasses = ['warning', 'error', 'info', 'success'];
    var self = this;
    $.each(controlGroupClasses, function (i) {
      self.removeClass(controlGroupClasses[i]);
    });
  };

  $.fn.removeClassStartingWith = function (classStartString) {
    var pattern = "\\b" + classStartString + '\\S+';
    var regex = new RegExp(pattern, 'g');
    $(this).attr('class', function (i, c) {
      return c.replace(regex, '');
    });
  };

  $.fn.sortElements = (function () {

    var sort = [].sort;

    return function (comparator, getSortable) {

      getSortable = getSortable || function () {
        return this;
      };

      var placements = this.map(function () {

        var sortElement = getSortable.call(this),
          parentNode = sortElement.parentNode,

        // Since the element itself will change position, we have
        // to have some way of storing it's original position in
        // the DOM. The easiest way is to have a 'flag' node:
          nextSibling = parentNode.insertBefore(
            document.createTextNode(''),
            sortElement.nextSibling
          );

        return function () {

          if (parentNode === this) {
            throw new Error(
              "You can't sort elements if any one is a descendant of another."
            );
          }

          // Insert before flag:
          parentNode.insertBefore(this, nextSibling);
          // Remove flag:
          parentNode.removeChild(nextSibling);

        };

      });

      return sort.call(this, comparator).each(function (i) {
        placements[i].call(getSortable.call(this));
      });

    };

  })();


  var splitVersion = $.fn.jquery.split(".");
  var major = parseInt(splitVersion[0]);
  var minor = parseInt(splitVersion[1]);

  var JQ_LT_17 = (major < 1) || (major === 1 && minor < 7);

  function eventsData($el) {
    return JQ_LT_17 ? $el.data('events') : $._data($el[0]).events;
  }

  function moveHandlerToTop($el, eventName, isDelegated) {
    var data = eventsData($el);
    var events = data[eventName];

    if (!JQ_LT_17) {
      var handler = isDelegated ? events.splice(events.delegateCount - 1, 1)[0] : events.pop();
      events.splice(isDelegated ? 0 : (events.delegateCount || 0), 0, handler);

      return;
    }

    if (isDelegated) {
      data.live.unshift(data.live.pop());
    } else {
      events.unshift(events.pop());
    }
  }

  function moveEventHandlers($elems, eventsString, isDelegate) {
    var events = eventsString.split(/\s+/);
    $elems.each(function () {
      for (var i = 0; i < events.length; ++i) {
        var pureEventName = $.trim(events[i]).match(/[^\.]+/i)[0];
        moveHandlerToTop($(this), pureEventName, isDelegate);
      }
    });
  }

  $.fn.bindFirst = function () {
    var args = $.makeArray(arguments);
    var eventsString = args.shift();

    if (eventsString) {
      $.fn.bind.apply(this, arguments);
      moveEventHandlers(this, eventsString);
    }

    return this;
  };

  $.fn.delegateFirst = function () {
    var args = $.makeArray(arguments);
    var eventsString = args[1];

    if (eventsString) {
      args.splice(0, 2);
      $.fn.delegate.apply(this, arguments);
      moveEventHandlers(this, eventsString, true);
    }

    return this;
  };

  $.fn.liveFirst = function () {
    var args = $.makeArray(arguments);

    // live = delegate to document
    args.unshift(this.selector);
    $.fn.delegateFirst.apply($(document), args);

    return this;
  };

  if (!JQ_LT_17) {
    $.fn.onFirst = function (types, selector) {
      var $el = $(this);
      var isDelegated = typeof selector === 'string';

      $.fn.on.apply($el, arguments);

      // events map
      if (typeof types === 'object') {
        for (var type in types) {
          if (types.hasOwnProperty(type)) {
            moveEventHandlers($el, type, isDelegated);
          }
        }
      } else if (typeof types === 'string') {
        moveEventHandlers($el, types, isDelegated);
      }

      return $el;
    };
  }

});
