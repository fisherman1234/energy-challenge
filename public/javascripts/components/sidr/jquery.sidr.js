/*
 * Sidr
 * https://github.com/artberri/sidr
 *
 * Copyright (c) 2013 Alberto Varela
 * Licensed under the MIT license.
 *
 * /!\ Adapted by Thibault to use 3D transforms and improve perfs on mobile /!\
 * Do not update, or readapt code if updated
 */



;
(function ($) {

  var sidrMoving = false,
    sidrOpened = false;

  // Private methods
  var privateMethods = {
    // Check for valids urls
    // From : http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url
    isUrl: function (str) {
      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      if (!pattern.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    // Loads the content into the menu bar
    loadContent: function ($menu, content) {
      $menu.html(content);
    },
    // Add sidr prefixes
    addPrefix: function ($element) {
      var elementId = $element.attr('id'),
        elementClass = $element.attr('class');

      if (typeof elementId === 'string' && '' !== elementId) {
        $element.attr('id', elementId.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-id-$1'));
      }
      if (typeof elementClass === 'string' && '' !== elementClass && 'sidr-inner' !== elementClass) {
        $element.attr('class', elementClass.replace(/([A-Za-z0-9_.\-]+)/g, 'sidr-class-$1'));
      }
      $element.removeAttr('style');
    },
    execute: function (action, name, callback) {
      // Check arguments
      if (typeof name === 'function') {
        callback = name;
        name = 'sidr';
      }
      else if (!name) {
        name = 'sidr';
      }

      // Declaring
      var $menu = $('#' + name),
        $body = $($menu.data('body')),
        $html = $('html'),
        menuWidth = $menu.outerWidth(true),
        speed = $menu.data('speed'),
        side = $menu.data('side'),
        bodyAnimation,
        menuAnimation,
        scrollTop;

      // Set css props
      $('.transitionable').addClass('movable');
      $body.addClass('movable');
      $menu.addClass('movable');

      // Open Sidr
      if ('open' === action || ('toogle' === action && !$menu.is(':visible'))) {
        // Check if we can open it
        if ($menu.is(':visible') || sidrMoving) {
          return;
        }

        // If another menu opened close first
        if (sidrOpened !== false) {
          methods.close(sidrOpened, function () {
            methods.open(name);
          });

          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Prepare page
        scrollTop = $html.scrollTop();
        //$html.css('overflow-x', 'hidden').scrollTop(scrollTop);

        // Show menu
        $menu.show();
        $body.css('position', 'absolute');
        $body.css('top', '0');

        // Perform translation

        setTimeout(function () { // without the timeout, the drawer animation is not shown
          var cl = 'sidr-translated-' + side;
          $('.transitionable').removeClass('sidr-translated-reset').addClass(cl);
          $body.removeClass('sidr-translated-reset').addClass(cl);
          $menu.removeClass('sidr-translated-right sidr-translated-left').addClass(cl);
          $(window).scrollTop(1, 0); // shows the full pan

          setTimeout(function () {
            // Execute post callbacks
            $('.body').on('click.sidr', function () {
              privateMethods.execute('close', name);
              $('.body').off('click.sidr');
            })

            sidrMoving = false;
            sidrOpened = name;

            if (typeof callback === 'function') {
              callback(name);
            }
          }, 400)
        }, 50);

        // transparent body pushed at the top of the existing body to prevent interaction with
        // dashboard when drawer is opened
        var bodyHidder = $('<div class="bodyHidder"/>');
        bodyHidder.css('height', $body.height());
        bodyHidder.css('width', $body.width());
        bodyHidder.css('position','absolute');
        bodyHidder.css('top', '0');

        $body.append(bodyHidder);


      }
      // Close Sidr
      else {
        // Check if we can close it
        if (!$menu.is(':visible') || sidrMoving) {
          return;
        }

        // Lock sidr
        sidrMoving = true;

        // Right or left menu?
        if (side === 'left') {
          var cl_s = 'sidr-translated-right';
        }
        else {
          var cl_s = 'sidr-translated-left';
        }

        // Prepare classes
        scrollTop = $html.scrollTop();
        $html.removeAttr('style').scrollTop(scrollTop);

        // Do the transition
        $('.transitionable').removeClass('sidr-translated-right sidr-translated-left').addClass('sidr-translated-reset');
        $body.removeClass('sidr-translated-right sidr-translated-left').addClass('sidr-translated-reset');
        $menu.removeClass('sidr-translated-right sidr-translated-left').addClass(cl_s);
        $body.css('position', 'relative');
        $body.css('top', '');


        setTimeout(function () {
          // Perform cleanup
          $menu.hide();
          $body.removeClass('sidr-translated-reset');

          $('html').removeAttr('style');
          sidrMoving = false;
          sidrOpened = false;

          if (typeof callback === 'function') {
            callback(name);
          }
        }, 350);

        $('.bodyHidder').remove();
      }
    }
  };

  // Sidr public methods
  var methods = {
    open: function (name, callback) {
      privateMethods.execute('open', name, callback);
    },
    close: function (name, callback) {
      privateMethods.execute('close', name, callback);
    },
    toogle: function (name, callback) {
      privateMethods.execute('toogle', name, callback);
    }
  };

  $.sidr = function (method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'function' || typeof method === 'string' || !method) {
      return methods.toogle.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sidr');
    }

  };

  $.fn.sidr = function (options) {

    var settings = $.extend({
      name: 'sidr', // Name for the 'sidr'
      speed: 200,    // Accepts standard jQuery effects speeds (i.e. fast, normal or milliseconds)
      side: 'left', // Accepts 'left' or 'right'
      source: null,   // Override the source of the content.
      renaming: true,   // The ids and classes will be prepended with a prefix when loading existent content
      body: '.body'  // Page container selector,
    }, options);

    var name = settings.name,
      $sideMenu = $('#' + name);

    // If the side menu do not exist create it
    if ($sideMenu.length === 0) {
      $sideMenu = $('<div />')
        .attr('id', name)
        .appendTo($('body'));
    }

    // Adding styles and options
    $sideMenu
      .addClass('sidr')
      .addClass(settings.side)
      .data({
        speed: settings.speed,
        side: settings.side,
        body: settings.body
      });

    $body = $(settings.body);

    $body.css({
      width: $body.width()
    });

    // The menu content
    if (typeof settings.source === 'function') {
      var newContent = settings.source(name);
      privateMethods.loadContent($sideMenu, newContent);
    }
    else if (typeof settings.source === 'string' && privateMethods.isUrl(settings.source)) {
      $.get(settings.source, function (data) {
        privateMethods.loadContent($sideMenu, data);
      });
    }
    else if (typeof settings.source === 'string') {
      var htmlContent = '',
        selectors = settings.source.split(',');

      $.each(selectors, function (index, element) {
        htmlContent += '<div class="sidr-inner">' + $(element).html() + '</div>';
      });

      // Renaming ids and classes
      if (settings.renaming) {
        var $htmlContent = $('<div />').html(htmlContent);
        $htmlContent.find('*').each(function (index, element) {
          var $element = $(element);
          privateMethods.addPrefix($element);
        });
        htmlContent = $htmlContent.html();
      }
      privateMethods.loadContent($sideMenu, htmlContent);
    }
    else if (settings.source !== null) {
      $.error('Invalid Sidr Source');
    }

    return this.each(function () {

      var $this = $(this),
        data = $this.data('sidr');

      // If the plugin hasn't been initialized yet
      if (!data) {
        $this.data('sidr', name);
        $this.click(function (e) {
          e.preventDefault();
          methods.toogle(name);
        });
      }
    });
  };

})(jQuery);
