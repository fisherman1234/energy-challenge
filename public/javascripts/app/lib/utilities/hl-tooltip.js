define([
  'jquery'
], function ($) {

  /*
   hlPopover is an extension of bootstrap popover.
   it accepts the following additional options :
   offset: {top: xxpx, left: yy px},
   arrowOffset: {top : xxpx, left: yypx},
   class: css class applied to the rendered element.

   example :

   $('#left-pane-inner').hlPopover({
   title: 'test',
   placement: 'bottom',
   offset: {top: 100, left: 100},
   arrowOffset: {left: '20%'},
   style: 'gray-tooltip'
   }).hlPopover('show');
   */


  var HLPopover = function (element, options) {
    this.init('hlPopover', element, options);
  };

  HLPopover.prototype = $.extend({}, $.fn.popover.Constructor.prototype, {

    constructor: HLPopover,
    arrow: function () {
      return this.tip().find('.arrow');
    },
    getTitle: function () {
      return null;
    },
    show: function () {
      $.fn.popover.Constructor.prototype.show.call(this);

      if (this.options.offset) {
        this.tip().css(this.options.offset);
      }
      if (this.options.arrowOffset) {
        this.arrow().css(this.options.arrowOffset);
      }
      if (this.options.style) {
        this.tip().addClass(this.options.style);
      }
      if (this.options.container) {
        this.tip().appendTo(this.options.container);
      } else {
        this.tip().insertAfter(this.$element);
      }
    }
  });

  $.fn.hlPopover = function (option) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data('hlPopover'),
        options = typeof option === 'object' && option;
      if (!data) {
        $this.data('hlPopover', (data = new HLPopover(this, options)));
      }
      if (typeof option === 'string') {
        data[option]();
      }
    });
  };

  $.fn.hlPopover.Constructor = HLPopover;

  $.fn.hlPopover.defaults = $.extend({}, $.fn.popover.defaults);


});
