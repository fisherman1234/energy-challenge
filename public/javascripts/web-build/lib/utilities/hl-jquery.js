define(["jquery"],function(e){function t(t){return u?t.data("events"):e._data(t[0]).events}function n(e,n,r){var i=t(e),s=i[n];if(!u){var o=r?s.splice(s.delegateCount-1,1)[0]:s.pop();s.splice(r?0:s.delegateCount||0,0,o);return}r?i.live.unshift(i.live.pop()):s.unshift(s.pop())}function r(t,r,i){var s=r.split(/\s+/);t.each(function(){for(var t=0;t<s.length;++t){var r=e.trim(s[t]).match(/[^\.]+/i)[0];n(e(this),r,i)}})}e.fn.isOnScreen=function(){var t=e(window),n={top:t.scrollTop(),left:t.scrollLeft()};n.right=n.left+t.width(),n.bottom=n.top+t.height();var r=this.offset();return r.right=r.left+this.outerWidth(),r.bottom=r.top+this.outerHeight(),!(n.right<r.left||n.left>r.right||n.bottom<r.top||n.top>r.bottom)},e.fn.scrollToShow=function(t){if(e(window).width()<=767)e(document).scrollTop(this.position().top-120);else{var n=this.closest(".scrollable");if(n.length===0)return;var r=this,i=this.offset().top-n.offset().top-120;t&&t.animate?n.animate({scrollTop:i},300):n.scrollTop(i)}},e.fn.bindToFileUpload=function(e){var t=this;e.on("change",function(){if(!this.files||!this.files[0])return;var e=new FileReader;e.onload=function(e){t.attr("src",e.target.result),t.css("height",t.width()),t.css("width",t.width())},e.readAsDataURL(this.files[0])})},e.fn.removeControlGroupIndicators=function(){var t=["warning","error","info","success"],n=this;e.each(t,function(e){n.removeClass(t[e])})},e.fn.removeClassStartingWith=function(t){var n="\\b"+t+"\\S+",r=new RegExp(n,"g");e(this).attr("class",function(e,t){return t.replace(r,"")})},e.fn.sortElements=function(){var e=[].sort;return function(t,n){n=n||function(){return this};var r=this.map(function(){var e=n.call(this),t=e.parentNode,r=t.insertBefore(document.createTextNode(""),e.nextSibling);return function(){if(t===this)throw new Error("You can't sort elements if any one is a descendant of another.");t.insertBefore(this,r),t.removeChild(r)}});return e.call(this,t).each(function(e){r[e].call(n.call(this))})}}();var i=e.fn.jquery.split("."),s=parseInt(i[0]),o=parseInt(i[1]),u=s<1||s===1&&o<7;e.fn.bindFirst=function(){var t=e.makeArray(arguments),n=t.shift();return n&&(e.fn.bind.apply(this,arguments),r(this,n)),this},e.fn.delegateFirst=function(){var t=e.makeArray(arguments),n=t[1];return n&&(t.splice(0,2),e.fn.delegate.apply(this,arguments),r(this,n,!0)),this},e.fn.liveFirst=function(){var t=e.makeArray(arguments);return t.unshift(this.selector),e.fn.delegateFirst.apply(e(document),t),this},u||(e.fn.onFirst=function(t,n){var i=e(this),s=typeof n=="string";e.fn.on.apply(i,arguments);if(typeof t=="object")for(var o in t)t.hasOwnProperty(o)&&r(i,o,s);else typeof t=="string"&&r(i,t,s);return i})});